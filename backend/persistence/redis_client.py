"""Redis Client"""
import redis.asyncio as redis
import os

class RedisClient:
    def __init__(self):
        self.url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        self._client = None

    async def connect(self):
        self._client = redis.from_url(self.url, decode_responses=True)

    async def get(self, key: str):
        return await self._client.get(key) if self._client else None

    async def set(self, key: str, value: str, ttl: int = None):
        return await self._client.set(key, value, ex=ttl) if self._client else None

    async def disconnect(self):
        if self._client:
            await self._client.close()
