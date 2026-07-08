-- Backend DB tables (if not using Supabase schema)
CREATE TABLE IF NOT EXISTS revenue_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    source VARCHAR(50),
    amount NUMERIC(12,2),
    currency VARCHAR(3) DEFAULT 'USD',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bot_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bot_name VARCHAR(100),
    platform VARCHAR(50),
    status VARCHAR(20),
    last_seen TIMESTAMPTZ DEFAULT NOW()
);
