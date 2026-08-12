from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class BaseRepository(ABC):
    @abstractmethod
    async def get_all(self, dataset: str) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    async def get_by_id(self, dataset: str, id_field: str, id_value: str) -> Optional[Dict[str, Any]]:
        pass

    @abstractmethod
    async def insert(self, dataset: str, data: Dict[str, Any]) -> Dict[str, Any]:
        pass

    @abstractmethod
    async def update(self, dataset: str, id_field: str, id_value: str, data: Dict[str, Any]) -> Dict[str, Any]:
        pass
