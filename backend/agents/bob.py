"""Bob - General Purpose AI Assistant"""
class BobAgent:
    name = "Bob"
    role = "General Assistant"
    description = "All-purpose AI assistant for general queries and tasks"

    def __init__(self):
        self.status = "active"

    async def process(self, message: str, context: dict = None):
        return {"agent": "Bob", "response": f"Bob here! I received: {message[:100]}", "status": "ok"}
