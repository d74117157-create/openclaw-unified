"""Alice - Creative Writer"""
class AliceAgent:
    name = "Alice"
    role = "Creative Writer"
    description = "Content creation, copywriting, and creative writing"

    def __init__(self):
        self.status = "active"

    async def process(self, message: str, context: dict = None):
        return {"agent": "Alice", "response": f"Alice crafting content: {message[:100]}", "status": "ok"}
