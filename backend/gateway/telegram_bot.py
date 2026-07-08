"""Telegram Bot Handler (3 bot instances)"""
import logging
logger = logging.getLogger(__name__)

class TelegramBot:
    def __init__(self, token: str, name: str = "bot"):
        self.token = token
        self.name = name
        self.status = "offline"

    async def start(self):
        self.status = "online"
        logger.info(f"Telegram {self.name} started")
        return {"status": "online", "bot": self.name}

    async def stop(self):
        self.status = "offline"
        return {"status": "offline"}

    async def get_status(self):
        return {"name": self.name, "platform": "telegram", "status": self.status}
