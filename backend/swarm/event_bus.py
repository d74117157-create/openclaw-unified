"""Event Bus for inter-agent communication"""
from typing import Callable, Dict, List
import asyncio

class EventBus:
    def __init__(self):
        self.subscribers: Dict[str, List[Callable]] = {}

    def subscribe(self, event_type: str, handler: Callable):
        if event_type not in self.subscribers:
            self.subscribers[event_type] = []
        self.subscribers[event_type].append(handler)

    async def publish(self, event_type: str, data: dict):
        handlers = self.subscribers.get(event_type, [])
        for handler in handlers:
            try:
                await handler(data)
            except Exception as e:
                print(f"Event handler error: {e}")
