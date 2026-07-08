"""Worker Pool for task distribution"""
import asyncio
from typing import List, Dict, Any

class WorkerPool:
    def __init__(self, max_workers: int = 5):
        self.max_workers = max_workers
        self.tasks: List[Dict[str, Any]] = []
        self.results: List[Dict[str, Any]] = []

    async def submit(self, coro, task_id: str = None):
        self.tasks.append({"id": task_id, "status": "running"})
        try:
            result = await coro
            self.results.append({"id": task_id, "status": "completed", "result": result})
            return result
        except Exception as e:
            self.results.append({"id": task_id, "status": "failed", "error": str(e)})
            raise

    async def map(self, coros: List):
        sem = asyncio.Semaphore(self.max_workers)
        async def bounded(coro):
            async with sem:
                return await coro
        return await asyncio.gather(*[bounded(c) for c in coros], return_exceptions=True)
