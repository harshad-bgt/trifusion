import urllib.request
import json
import time

BASE_URL = "http://localhost:8000"
admin_token = None
lead_id = None

def fetch(path, method="GET", data=None, headers=None):
    if headers is None:
        headers = {}
    
    if data:
        data = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"
        
    req = urllib.request.Request(f"{BASE_URL}{path}", data=data, headers=headers, method=method)
    try:
        res = urllib.request.urlopen(req)
        return res.status, json.loads(res.read().decode())
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode())
        except:
            return e.code, e.read().decode()
    except Exception as e:
        return 0, str(e)

print("Waiting for server to start...")
time.sleep(3)

print("\n--- 5. Test /api/health ---")
status, data = fetch("/api/health")
print(f"Status: {status}, Data: {data}")

print("\n--- 6. Test admin bootstrap ---")
status, data = fetch("/api/auth/bootstrap", method="POST")
print(f"Status: {status}, Data: {data}")

print("\n--- 7. Verify repeated bootstrap ---")
status, data = fetch("/api/auth/bootstrap", method="POST")
print(f"Status: {status}, Data: {data}")

print("\n--- 8. Test admin login ---")
status, data = fetch("/api/auth/login", method="POST", data={"email": "admin@trifusiontech.in", "password": "1234"})
print(f"Status: {status}, Data: {data}")
if status == 200 and data.get("success"):
    admin_token = data["data"]["token"]

auth_header = {"Authorization": f"Bearer {admin_token}"} if admin_token else {}

print("\n--- 9. Test POST /api/leads ---")
lead_data = {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "message": "This is a test message"
}
status, data = fetch("/api/leads", method="POST", data=lead_data)
print(f"Status: {status}, Data: {data}")

print("\n--- 11. Test GET /api/leads ---")
status, data = fetch("/api/leads", headers=auth_header)
print(f"Status: {status}, Total Items: {data.get('data', {}).get('pagination', {}).get('total', 0) if isinstance(data, dict) else data}")

print("\n--- 12. Test GET /api/admin/stats ---")
status, data = fetch("/api/admin/stats", headers=auth_header)
print(f"Status: {status}, Data: {data}")

print("\n--- 13. Test Datasets ---")
for dataset in ["services", "industries", "products", "case-studies", "testimonials", "faqs"]:
    status, data = fetch(f"/api/{dataset}")
    count = data.get('data', {}).get('pagination', {}).get('total', 0) if isinstance(data, dict) and data.get('success') else str(data)[:50]
    print(f"Dataset {dataset} -> Status: {status}, Count/Data: {count}")

