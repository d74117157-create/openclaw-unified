"""Rate Limiter"""
import time
from typing import Dict

class RateLimiter:
    def __init__(self, max_requests: int = 60, window: int = 60):
        self.max_requests = max_requests
        self.window = window
        self.requests: Dict[str, list] = {}

    def is_allowed(self, key: str) -> bool:
        now = time.time()
        self.requests.setdefault(key, [])
        self.requests[key] = [t for t in self.requests[key] if now - t < self.window]
        if len(self.requests[key]) < self.max_requests:
            self.requests[key].append(now)
            return True
        return False
