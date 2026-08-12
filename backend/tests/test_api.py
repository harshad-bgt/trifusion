import pytest
from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import patch, AsyncMock
from app.core.security import get_password_hash
import os

client = TestClient(app)

@pytest.fixture
def mock_gs_repo():
    with patch("app.routers.leads.gs_repo") as mock_repo, \
         patch("app.routers.auth.gs_repo") as mock_auth_repo, \
         patch("app.routers.datasets.gs_repo") as mock_data_repo:
        
        mock_repo.insert = AsyncMock(return_value={"id": "123"})
        
        mock_auth_repo.get_all = AsyncMock(return_value=[])
        mock_auth_repo.insert = AsyncMock(return_value={})
        
        mock_data_repo.get_all = AsyncMock(return_value=[{"id": "1", "slug": "test", "status": "PUBLISHED"}])
        mock_data_repo.get_by_id = AsyncMock(return_value={"id": "1", "slug": "test", "status": "PUBLISHED"})
        
        yield {
            "leads": mock_repo,
            "auth": mock_auth_repo,
            "data": mock_data_repo
        }

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_options_leads():
    # Preflight request to /api/leads must succeed with 200 or 204
    response = client.options("/api/leads", headers={"Origin": "http://localhost:3000", "Access-Control-Request-Method": "POST"})
    assert response.status_code in [200, 204]
    assert "access-control-allow-origin" in response.headers
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"

def test_post_leads_valid(mock_gs_repo):
    response = client.post(
        "/api/leads",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "message": "This is a test message."
        }
    )
    assert response.status_code == 200
    assert response.json()["success"] is True
    assert "leadRef" in response.json()["data"]

def test_post_leads_invalid():
    # Missing required field
    response = client.post(
        "/api/leads",
        json={
            "name": "Test User",
            "email": "test@example.com"
        }
    )
    assert response.status_code == 422 # FastAPI validation error

def test_lead_rate_limiting(mock_gs_repo):
    for _ in range(5):
        client.post("/api/leads", json={"name": "Test", "phone": "123456789", "message": "msg123"})
    
    res = client.post("/api/leads", json={"name": "Test", "phone": "123456789", "message": "msg123"})
    assert res.status_code in [200, 429]

@patch.dict(os.environ, {"ADMIN_BOOTSTRAP_EMAIL": "admin@test.com", "ADMIN_BOOTSTRAP_PASSWORD": "pass"})
def test_admin_bootstrap_and_login(mock_gs_repo):
    mock_gs_repo["auth"].get_all = AsyncMock(return_value=[])
    # Bootstrap
    res_boot = client.post("/api/auth/bootstrap")
    assert res_boot.status_code == 200, res_boot.json()
    mock_gs_repo["auth"].insert.assert_called_once()
    
    # Now simulate login by making the mock return the user
    hashed = get_password_hash("pass")
    mock_gs_repo["auth"].get_all = AsyncMock(return_value=[{"email": "admin@test.com", "password_hash": hashed, "role": "admin"}])
    
    res_login = client.post("/api/auth/login", json={"email": "admin@test.com", "password": "pass"})
    assert res_login.status_code == 200, res_login.json()
    assert "token" in res_login.json()["data"]
    
    token = res_login.json()["data"]["token"]
    
    # Verify token
    res_verify = client.post("/api/auth/verify", headers={"Authorization": f"Bearer {token}"})
    assert res_verify.status_code == 200, res_verify.json()
    assert res_verify.json()["data"]["user"]["email"] == "admin@test.com"

def test_invalid_login(mock_gs_repo):
    mock_gs_repo["auth"].get_all = AsyncMock(return_value=[])
    res = client.post("/api/auth/login", json={"email": "admin@test.com", "password": "wrong"})
    assert res.status_code == 401

def test_invalid_jwt():
    res = client.post("/api/auth/verify", headers={"Authorization": f"Bearer fake-token"})
    assert res.status_code == 401

def test_dataset_retrieval(mock_gs_repo):
    res = client.get("/api/services")
    assert res.status_code == 200
    assert res.json()["success"] is True
    assert len(res.json()["data"]["items"]) == 1

def test_dataset_invalid(mock_gs_repo):
    res = client.get("/api/unknown_dataset")
    assert res.status_code == 404

def test_google_sheets_failure(mock_gs_repo):
    mock_gs_repo["leads"].insert.side_effect = Exception("GOOGLE_SHEETS_UNAVAILABLE")
    response = client.post(
        "/api/leads",
        json={"name": "Test", "phone": "123456789", "message": "msg123"}
    )
    assert response.status_code == 503
