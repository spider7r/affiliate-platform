-- ╔══════════════════════════════════════════════════════════════╗
-- ║           TRADAL AFFILIATE PLATFORM - DATABASE SCHEMA       ║
-- ║                                                              ║
-- ║  Run this ENTIRE file in your Supabase SQL Editor.           ║
-- ║  Project: Dedicated Affiliate Supabase                       ║
-- ║  URL: https://zulnhndzaaylrxhmbdrc.supabase.co              ║
-- ╚══════════════════════════════════════════════════════════════╝

-- ─────────────────────────────────────────────
-- 1. ENABLE EXTENSIONS
-- ─────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ─────────────────────────────────────────────
-- 2. TABLE: affiliates (Partners)
-- ─────────────────────────────────────────────
-- Stores all partner / affiliate profiles.
-- Each affiliate gets a unique referral code.
CREATE TABLE IF NOT EXISTS affiliates (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id         UUID,                             -- Optional: link to Supabase Auth user
    full_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE,
    code            TEXT NOT NULL UNIQUE,              -- Referral code (e.g. TRADAL20)
    status          TEXT DEFAULT 'pending'             -- 'active', 'pending', 'suspended'
                    CHECK (status IN ('active', 'pending', 'suspended')),
    commission_rate NUMERIC(5,2) DEFAULT 20.00         -- Commission % (e.g. 20.00 = 20%)
                    CHECK (commission_rate >= 0 AND commission_rate <= 100),
    total_earnings  NUMERIC(10,2) DEFAULT 0.00,        -- Lifetime earnings
    pending_payout  NUMERIC(10,2) DEFAULT 0.00,        -- Awaiting payout
    total_paid      NUMERIC(10,2) DEFAULT 0.00,        -- Already paid out
    total_clicks    INTEGER DEFAULT 0,                 -- Total link clicks
    bio             TEXT,                               -- Optional partner bio
    website         TEXT,                               -- Partner website
    social_links    JSONB DEFAULT '{}',                -- Social media links
    notes           TEXT,                               -- Admin notes
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- 3. TABLE: referrals (Conversions)
-- ─────────────────────────────────────────────
-- Each row = one successful conversion from an affiliate link.
CREATE TABLE IF NOT EXISTS referrals (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    affiliate_id    UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
    referred_email  TEXT,                               -- Email of the converted user
    referred_name   TEXT,                               -- Name of the converted user
    plan_purchased  TEXT,                               -- Which plan they bought
    amount          NUMERIC(10,2) DEFAULT 0.00,         -- Sale amount (before commission)
    earnings        NUMERIC(10,2) DEFAULT 0.00,         -- Commission earned on this referral
    status          TEXT DEFAULT 'pending'              -- 'pending', 'converted', 'paid', 'refunded'
                    CHECK (status IN ('pending', 'converted', 'paid', 'refunded')),
    transaction_id  TEXT,                               -- External payment transaction ID
    ip_address      TEXT,                               -- Referral IP for fraud detection
    user_agent      TEXT,                               -- Browser user agent
    metadata        JSONB DEFAULT '{}',                -- Any extra data
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- 4. TABLE: affiliate_clicks (Link tracking)
-- ─────────────────────────────────────────────
-- Tracks every click on an affiliate referral link.
CREATE TABLE IF NOT EXISTS affiliate_clicks (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    affiliate_id    UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
    ip_address      TEXT,
    user_agent      TEXT,
    referrer_url    TEXT,                               -- Where the click came from
    landing_page    TEXT,                               -- Which page they landed on
    country         TEXT,                               -- Geo-detected country
    device_type     TEXT,                               -- 'desktop', 'mobile', 'tablet'
    converted       BOOLEAN DEFAULT FALSE,             -- Did this click lead to a conversion?
    created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- 5. TABLE: payout_methods (Payment preferences)
-- ─────────────────────────────────────────────
-- Each affiliate can have multiple payout methods (bank, PayPal, crypto).
CREATE TABLE IF NOT EXISTS payout_methods (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    affiliate_id    UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
    method_type     TEXT NOT NULL                       -- 'bank_transfer', 'paypal', 'crypto'
                    CHECK (method_type IN ('bank_transfer', 'paypal', 'crypto')),
    details         JSONB NOT NULL DEFAULT '{}',        -- Method-specific details:
                                                       --   bank: { bank_name, account_holder, account_number, routing_number, swift_code }
                                                       --   paypal: { email }
                                                       --   crypto: { wallet_address, network }
    is_primary      BOOLEAN DEFAULT FALSE,             -- Which method is the default
    is_verified     BOOLEAN DEFAULT FALSE,             -- Admin-verified method
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- 6. TABLE: payouts (Payout history)
-- ─────────────────────────────────────────────
-- Records every payout processed to an affiliate.
CREATE TABLE IF NOT EXISTS payouts (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    affiliate_id    UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
    amount          NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    method_type     TEXT NOT NULL,                      -- Same as payout_methods.method_type
    status          TEXT DEFAULT 'processing'           -- 'processing', 'completed', 'failed', 'cancelled'
                    CHECK (status IN ('processing', 'completed', 'failed', 'cancelled')),
    transaction_ref TEXT,                               -- External transaction reference
    notes           TEXT,                               -- Admin notes on payout
    processed_by    TEXT,                               -- Admin who processed it
    completed_at    TIMESTAMPTZ,                        -- When payout was completed
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- 7. TABLE: affiliate_notifications
-- ─────────────────────────────────────────────
-- Notifications sent to affiliates.
CREATE TABLE IF NOT EXISTS affiliate_notifications (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    affiliate_id    UUID NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    message         TEXT NOT NULL,
    type            TEXT DEFAULT 'info'                 -- 'info', 'success', 'warning', 'payout'
                    CHECK (type IN ('info', 'success', 'warning', 'payout')),
    is_read         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- 8. TABLE: admin_activity_log
-- ─────────────────────────────────────────────
-- Audit trail for all admin actions.
CREATE TABLE IF NOT EXISTS admin_activity_log (
    id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_email     TEXT,
    action          TEXT NOT NULL,                      -- 'commission_updated', 'status_changed', 'payout_processed', etc.
    target_id       UUID,                               -- ID of affected record
    details         JSONB DEFAULT '{}',                -- Action details
    created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ═════════════════════════════════════════════
-- 9. INDEXES (Performance)
-- ═════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_affiliates_code       ON affiliates(code);
CREATE INDEX IF NOT EXISTS idx_affiliates_email      ON affiliates(email);
CREATE INDEX IF NOT EXISTS idx_affiliates_status     ON affiliates(status);
CREATE INDEX IF NOT EXISTS idx_affiliates_user_id    ON affiliates(user_id);

CREATE INDEX IF NOT EXISTS idx_referrals_affiliate   ON referrals(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status      ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_created     ON referrals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_referrals_email       ON referrals(referred_email);

CREATE INDEX IF NOT EXISTS idx_clicks_affiliate      ON affiliate_clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_clicks_created        ON affiliate_clicks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clicks_converted      ON affiliate_clicks(converted);

CREATE INDEX IF NOT EXISTS idx_payout_methods_aff    ON payout_methods(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_payouts_affiliate     ON payouts(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status        ON payouts(status);
CREATE INDEX IF NOT EXISTS idx_payouts_created       ON payouts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_aff     ON affiliate_notifications(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read    ON affiliate_notifications(is_read);

CREATE INDEX IF NOT EXISTS idx_admin_log_action      ON admin_activity_log(action);
CREATE INDEX IF NOT EXISTS idx_admin_log_created     ON admin_activity_log(created_at DESC);


-- ═════════════════════════════════════════════
-- 10. AUTO-UPDATE TRIGGER: updated_at
-- ═════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN SELECT unnest(ARRAY['affiliates', 'referrals', 'payout_methods', 'payouts'])
    LOOP
        EXECUTE format('
            DROP TRIGGER IF EXISTS trigger_updated_at ON %I;
            CREATE TRIGGER trigger_updated_at
                BEFORE UPDATE ON %I
                FOR EACH ROW
                EXECUTE FUNCTION update_updated_at_column();
        ', tbl, tbl);
    END LOOP;
END;
$$;


-- ═════════════════════════════════════════════
-- 11. ROW LEVEL SECURITY (RLS)
-- ═════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE affiliates              ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals               ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks        ENABLE ROW LEVEL SECURITY;
ALTER TABLE payout_methods          ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log      ENABLE ROW LEVEL SECURITY;

-- ── Affiliates: can read own row ──
CREATE POLICY "Affiliates can view own profile"
    ON affiliates FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Affiliates can update own profile"
    ON affiliates FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ── Referrals: can read own referrals ──
CREATE POLICY "Affiliates can view own referrals"
    ON referrals FOR SELECT
    USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

-- ── Clicks: can read own clicks ──
CREATE POLICY "Affiliates can view own clicks"
    ON affiliate_clicks FOR SELECT
    USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

-- ── Payout Methods: full CRUD on own ──
CREATE POLICY "Affiliates can view own payout methods"
    ON payout_methods FOR SELECT
    USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

CREATE POLICY "Affiliates can insert own payout methods"
    ON payout_methods FOR INSERT
    WITH CHECK (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

CREATE POLICY "Affiliates can update own payout methods"
    ON payout_methods FOR UPDATE
    USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

CREATE POLICY "Affiliates can delete own payout methods"
    ON payout_methods FOR DELETE
    USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

-- ── Payouts: can read own ──
CREATE POLICY "Affiliates can view own payouts"
    ON payouts FOR SELECT
    USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

-- ── Notifications: can read/update own ──
CREATE POLICY "Affiliates can view own notifications"
    ON affiliate_notifications FOR SELECT
    USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

CREATE POLICY "Affiliates can mark own notifications as read"
    ON affiliate_notifications FOR UPDATE
    USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));


-- ═════════════════════════════════════════════
-- 12. HELPER FUNCTIONS
-- ═════════════════════════════════════════════

-- Get affiliate stats for a given affiliate
CREATE OR REPLACE FUNCTION get_affiliate_stats(p_affiliate_id UUID)
RETURNS TABLE (
    total_referrals BIGINT,
    converted_referrals BIGINT,
    pending_referrals BIGINT,
    paid_referrals BIGINT,
    total_clicks BIGINT,
    conversion_rate NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT AS total_referrals,
        COUNT(*) FILTER (WHERE r.status = 'converted')::BIGINT AS converted_referrals,
        COUNT(*) FILTER (WHERE r.status = 'pending')::BIGINT AS pending_referrals,
        COUNT(*) FILTER (WHERE r.status = 'paid')::BIGINT AS paid_referrals,
        (SELECT COUNT(*)::BIGINT FROM affiliate_clicks c WHERE c.affiliate_id = p_affiliate_id),
        CASE 
            WHEN (SELECT COUNT(*) FROM affiliate_clicks c WHERE c.affiliate_id = p_affiliate_id) > 0
            THEN ROUND(COUNT(*) FILTER (WHERE r.status IN ('converted', 'paid'))::NUMERIC / 
                 (SELECT COUNT(*) FROM affiliate_clicks c WHERE c.affiliate_id = p_affiliate_id) * 100, 2)
            ELSE 0
        END AS conversion_rate
    FROM referrals r
    WHERE r.affiliate_id = p_affiliate_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get admin overview stats
CREATE OR REPLACE FUNCTION get_admin_overview()
RETURNS TABLE (
    total_partners BIGINT,
    active_partners BIGINT,
    total_conversions BIGINT,
    total_revenue NUMERIC,
    total_commission_paid NUMERIC,
    total_commission_pending NUMERIC,
    avg_commission_rate NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT,
        COUNT(*) FILTER (WHERE a.status = 'active')::BIGINT,
        (SELECT COUNT(*)::BIGINT FROM referrals),
        COALESCE(SUM(a.total_earnings), 0) * 5,    -- Estimated revenue (5x commission)
        COALESCE(SUM(a.total_paid), 0),
        COALESCE(SUM(a.pending_payout), 0),
        COALESCE(AVG(a.commission_rate), 0)
    FROM affiliates a;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ═════════════════════════════════════════════
-- ✅ DONE! Your database is ready.
-- ═════════════════════════════════════════════
-- 
-- Tables created:
--   1. affiliates           - Partner profiles
--   2. referrals            - Conversion records
--   3. affiliate_clicks     - Link click tracking
--   4. payout_methods       - Payment preferences
--   5. payouts              - Payout history
--   6. affiliate_notifications - Partner notifications
--   7. admin_activity_log   - Admin audit trail
--
-- Features:
--   ✓ UUID primary keys
--   ✓ Foreign key constraints with CASCADE delete
--   ✓ CHECK constraints on status fields
--   ✓ Row Level Security (RLS) policies
--   ✓ Auto-updating updated_at timestamps
--   ✓ Performance indexes on all key columns
--   ✓ Helper functions for stats
-- ═════════════════════════════════════════════
