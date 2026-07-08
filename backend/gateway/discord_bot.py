"""Discord Bot Handler"""
import logging
logger = logging.getLogger(__name__)

class DiscordBot:
    def __init__(self, token: str, client_id: str):
        self.token = token
        self.client_id = client_id
        self.status = "offline"

    async def start(self):
        self.status = "online"
        logger.info("Discord bot started")
        return {"status": "online", "platform": "discord"}

    async def stop(self):
        self.status = "offline"
        return {"status": "offline"}

    async def get_status(self):
        return {"name": "OpenClaw Discord", "platform": "discord", "status": self.status, "client_id": self.client_id}
