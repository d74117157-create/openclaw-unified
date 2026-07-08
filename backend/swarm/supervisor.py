"""Supervisor for orchestrating agents"""
from .event_bus import EventBus
from .worker_pool import WorkerPool

class Supervisor:
    def __init__(self):
        self.event_bus = EventBus()
        self.worker_pool = WorkerPool(max_workers=10)
        self.agents = {}

    def register_agent(self, agent_id: str, agent):
        self.agents[agent_id] = agent

    async def route(self, message: str, target_agent: str = None):
        if target_agent and target_agent in self.agents:
            return await self.agents[target_agent].process(message)
        # Route to Bob by default
        return await self.agents.get("bob").process(message)
