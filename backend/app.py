from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import asyncio
import json

app = FastAPI(title="OpenClaw Backend", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health/live")
async def health_check():
    return {"status": "ok", "version": "2.0.0", "service": "openclaw-backend"}

@app.get("/api/revenue/summary")
async def revenue_summary():
    return {
        "daily": 0,
        "weekly": 0,
        "monthly": 0,
        "mrr_estimate": 0,
        "by_source": {
            "affiliate": 0,
            "digital_product": 0,
            "youtube": 0,
            "tiktok": 0,
            "other": 0
        },
        "trend_percent": 0.0
    }

@app.get("/api/revenue/chart")
async def revenue_chart(days: int = 30):
    return []

@app.get("/api/integrations")
async def integrations_list():
    return [
        {
            "id": "1",
            "name": "GitHub",
            "slug": "github",
            "category": "vcs",
            "status": "connected",
            "health": "healthy",
            "description": "Source control",
            "last_sync": None,
            "latency_ms": 45,
            "config": {},
            "docs_url": "https://docs.github.com"
        },
        {
            "id": "2",
            "name": "Discord",
            "slug": "discord",
            "category": "messaging",
            "status": "connected",
            "health": "healthy",
            "description": "Discord bot gateway",
            "last_sync": None,
            "latency_ms": 82,
            "config": {}
        },
        {
            "id": "3",
            "name": "Supabase",
            "slug": "supabase",
            "category": "database",
            "status": "connected",
            "health": "healthy",
            "description": "Postgres + Auth",
            "last_sync": None,
            "latency_ms": 23,
            "config": {}
        }
    ]

@app.post("/api/integrations/{integration_id}/test")
async def test_integration(integration_id: str):
    return {"ok": True, "latency_ms": 45, "integration_id": integration_id}

@app.get("/api/bots")
async def bots_list():
    return [
        {"id": "1", "name": "OpenClaw Bot 1", "platform": "telegram", "status": "online", "username": "@openclaw_bot1"},
        {"id": "2", "name": "OpenClaw Bot 2", "platform": "telegram", "status": "online", "username": "@openclaw_bot2"},
        {"id": "3", "name": "OpenClaw Super", "platform": "telegram", "status": "online", "username": "@openclaw_super"},
        {"id": "4", "name": "OpenClaw Discord", "platform": "discord", "status": "online", "client_id": "1486924238731477103"},
        {"id": "5", "name": "OpenClaw Slack", "platform": "slack", "status": "online"}
    ]

@app.get("/api/agents")
async def agents_list():
    return [
        {"id": "bob", "name": "Bob", "role": "General Assistant", "status": "active", "model": "gpt-4o", "description": "All-purpose AI assistant"},
        {"id": "carla", "name": "Carla", "role": "Code Expert", "status": "active", "model": "gpt-4o", "description": "Software development specialist"},
        {"id": "dave", "name": "Dave", "role": "Data Analyst", "status": "active", "model": "gpt-4o", "description": "Data analysis and visualization"},
        {"id": "alice", "name": "Alice", "role": "Creative Writer", "status": "active", "model": "gpt-4o", "description": "Content creation and writing"},
        {"id": "ralph", "name": "Ralph", "role": "System Admin", "status": "active", "model": "gpt-4o", "description": "DevOps and system administration"}
    ]

@app.get("/api/deployments")
async def deployments_list():
    return [
        {"id": "1", "name": "openclaw-backend", "platform": "render", "status": "live", "url": "https://openclaw-backend.onrender.com", "last_deploy": "2025-01-01T00:00:00Z"},
        {"id": "2", "name": "openclaw-frontend", "platform": "vercel", "status": "live", "url": "https://openclaw-command-center.vercel.app", "last_deploy": "2025-01-01T00:00:00Z"}
    ]

@app.get("/api/logs")
async def logs_list(limit: int = 50):
    return []

@app.post("/api/command/chat")
async def command_chat(request: dict):
    message = request.get("message", "")
    async def event_stream():
        words = ["Processing", " your", " request...", " Done!"]
        for word in words:
            yield f"data: {json.dumps({'type': 'token', 'content': word})}\n\n"
            await asyncio.sleep(0.1)
        yield f"data: {json.dumps({'type': 'done'})}\n\n"
    return StreamingResponse(event_stream(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
