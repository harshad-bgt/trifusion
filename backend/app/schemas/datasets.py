from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class DatasetImportRequest(BaseModel):
    data: List[Dict[str, Any]]

class DatasetExportResponse(BaseModel):
    success: bool
    data: List[Dict[str, Any]]
