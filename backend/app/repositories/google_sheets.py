import os
import gspread
from google.oauth2.service_account import Credentials
from typing import List, Dict, Any, Optional
from app.repositories.base import BaseRepository

class GoogleSheetsRepository(BaseRepository):
    def __init__(self):
        self.project_id = os.getenv("GOOGLE_PROJECT_ID")
        self.client_email = os.getenv("GOOGLE_CLIENT_EMAIL")
        self.private_key = os.getenv("GOOGLE_PRIVATE_KEY", "").replace('\\n', '\n')
        self.spreadsheet_id = os.getenv("GOOGLE_SPREADSHEET_ID")
        self.client = None
        self._authenticate()

    def _authenticate(self):
        if not self.client_email or not self.private_key or not self.spreadsheet_id:
            print("[WARN] Google Sheets credentials missing. Repository disabled.")
            return

        try:
            credentials = Credentials.from_service_account_info(
                {
                    "project_id": self.project_id,
                    "client_email": self.client_email,
                    "private_key": self.private_key,
                    "token_uri": "https://oauth2.googleapis.com/token",
                },
                scopes=[
                    "https://www.googleapis.com/auth/spreadsheets",
                    "https://www.googleapis.com/auth/drive"
                ]
            )
            self.client = gspread.authorize(credentials)
        except Exception as e:
            print(f"[ERROR] Google Sheets Auth Failed: {e}")
            self.client = None

    def _get_worksheet(self, title: str):
        if not self.client:
            raise Exception("GOOGLE_SHEETS_UNAVAILABLE")
        try:
            sheet = self.client.open_by_key(self.spreadsheet_id)
            return sheet.worksheet(title)
        except gspread.exceptions.WorksheetNotFound:
            raise Exception("DATASET_NOT_FOUND")
        except Exception as e:
            raise Exception("GOOGLE_SHEETS_UNAVAILABLE")

    async def get_all(self, dataset: str) -> List[Dict[str, Any]]:
        ws = self._get_worksheet(dataset)
        try:
            records = ws.get_all_records()
            return records
        except Exception as e:
            raise Exception("GOOGLE_SHEETS_UNAVAILABLE")

    async def get_by_id(self, dataset: str, id_field: str, id_value: str) -> Optional[Dict[str, Any]]:
        records = await self.get_all(dataset)
        for r in records:
            if str(r.get(id_field)) == str(id_value):
                return r
        return None

    async def insert(self, dataset: str, data: Dict[str, Any]) -> Dict[str, Any]:
        ws = self._get_worksheet(dataset)
        try:
            # get headers
            headers = ws.row_values(1)
            if not headers:
                # if sheet is empty, create headers from keys
                headers = list(data.keys())
                ws.append_row(headers)
            
            row = []
            for h in headers:
                val = data.get(h, "")
                if isinstance(val, (dict, list)):
                    val = str(val)
                row.append(val)
            ws.append_row(row)
            return data
        except Exception as e:
            print(f"[ERROR] Insert failed: {e}")
            raise Exception("GOOGLE_SHEETS_UNAVAILABLE")

    async def update(self, dataset: str, id_field: str, id_value: str, data: Dict[str, Any]) -> Dict[str, Any]:
        ws = self._get_worksheet(dataset)
        try:
            records = ws.get_all_records()
            headers = ws.row_values(1)
            row_index = None
            for idx, r in enumerate(records):
                if str(r.get(id_field)) == str(id_value):
                    row_index = idx + 2 # +2 because of 1-based indexing and header row
                    break
            
            if row_index is None:
                raise Exception("RECORD_NOT_FOUND")
                
            row = []
            for h in headers:
                val = data.get(h, "")
                if isinstance(val, (dict, list)):
                    val = str(val)
                row.append(val)
            
            # Note: naive update, in production use batch update or update_cell
            ws.update(f"A{row_index}:{gspread.utils.rowcol_to_a1(row_index, len(headers))}", [row])
            return data
        except Exception as e:
            if str(e) == "RECORD_NOT_FOUND":
                raise e
            raise Exception("GOOGLE_SHEETS_UNAVAILABLE")

# Singleton instance
gs_repo = GoogleSheetsRepository()
