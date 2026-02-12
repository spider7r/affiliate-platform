-- ═══════════════════════════════════════════
-- ADDITIONAL: Increment click count function
-- Run this AFTER the main schema
-- ═══════════════════════════════════════════

CREATE OR REPLACE FUNCTION increment_clicks(affiliate_id_input UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE affiliates 
    SET total_clicks = COALESCE(total_clicks, 0) + 1
    WHERE id = affiliate_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
