-- Enable pgcrypto for hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nom TEXT,
    email TEXT UNIQUE,
    pays TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    suspendu BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. ACCESS CODES TABLE (Stores SHA-256 code_hash, plaintext is never stored!)
CREATE TABLE IF NOT EXISTS public.access_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_hash TEXT NOT NULL UNIQUE,
    plan TEXT NOT NULL CHECK (plan IN ('weekly', 'monthly', 'yearly')),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    expires_at TIMESTAMPTZ,
    usage TEXT NOT NULL DEFAULT 'single' CHECK (usage IN ('single', 'multi')),
    used_count INT NOT NULL DEFAULT 0,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan TEXT NOT NULL CHECK (plan IN ('weekly', 'monthly', 'yearly')),
    start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_date TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. MEETINGS TABLE
CREATE TABLE IF NOT EXISTS public.meetings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reunion TEXT NOT NULL,
    hippodrome TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. RACES TABLE
CREATE TABLE IF NOT EXISTS public.races (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meeting_id UUID REFERENCES public.meetings(id) ON DELETE CASCADE,
    course TEXT NOT NULL,
    nom_prix TEXT NOT NULL,
    heure TIME NOT NULL,
    discipline TEXT NOT NULL,
    distance TEXT NOT NULL,
    allocation TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'UPCOMING' CHECK (status IN ('UPCOMING', 'FINISHED', 'LIVE')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. FREE PICKS TABLE
CREATE TABLE IF NOT EXISTS public.free_picks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    race_id UUID REFERENCES public.races(id) ON DELETE SET NULL,
    discipline TEXT NOT NULL CHECK (discipline IN ('quinte', 'quarte', 'pmu', 'trio')),
    favorites JSONB NOT NULL DEFAULT '[]'::jsonb,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    short_analysis TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. VIP PICKS TABLE (PROTECTED BY STRICT RLS)
CREATE TABLE IF NOT EXISTS public.vip_picks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    race_id UUID REFERENCES public.races(id) ON DELETE SET NULL,
    course TEXT NOT NULL,
    favori TEXT NOT NULL,
    tuyau TEXT NOT NULL,
    outsider TEXT NOT NULL,
    tokard TEXT NOT NULL,
    combinations JSONB NOT NULL DEFAULT '{}'::jsonb,
    synthesis TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    publish_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    race_id UUID REFERENCES public.races(id) ON DELETE SET NULL,
    course TEXT NOT NULL,
    partants INT NOT NULL DEFAULT 0,
    arrival_numbers TEXT[] NOT NULL DEFAULT '{}',
    non_runners TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published')),
    publish_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    avatar TEXT,
    comment TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    is_demo BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. FAQ TABLE
CREATE TABLE IF NOT EXISTS public.faq (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'Général',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. SITE CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. ACCESS LOGS TABLE
CREATE TABLE IF NOT EXISTS public.access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    ip_address TEXT,
    action TEXT NOT NULL,
    status TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. MESSAGES TABLE (Contact form submissions)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. VIP REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.vip_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    plan TEXT NOT NULL,
    phone TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.races ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.free_picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_requests ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin' AND suspendu = FALSE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has active VIP access
CREATE OR REPLACE FUNCTION public.is_active_vip(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.subscriptions
        WHERE user_id = p_user_id
          AND status = 'active'
          AND end_date > NOW()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES Policies
CREATE POLICY "Public profiles are viewable by self and admins"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- ACCESS CODES Policies (Admin only)
CREATE POLICY "Access codes admin only"
    ON public.access_codes FOR ALL
    USING (public.is_admin());

-- SUBSCRIPTIONS Policies
CREATE POLICY "Users view own subscriptions"
    ON public.subscriptions FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

-- PUBLIC READ TABLES (Free Picks, Meetings, Races, Results, Testimonials, FAQ, Content, Settings)
CREATE POLICY "Public read meetings" ON public.meetings FOR SELECT USING (TRUE);
CREATE POLICY "Public read races" ON public.races FOR SELECT USING (TRUE);
CREATE POLICY "Public read free_picks" ON public.free_picks FOR SELECT USING (TRUE);
CREATE POLICY "Public read results" ON public.results FOR SELECT USING (status = 'published' OR public.is_admin());
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (TRUE);
CREATE POLICY "Public read faq" ON public.faq FOR SELECT USING (TRUE);
CREATE POLICY "Public read site_content" ON public.site_content FOR SELECT USING (TRUE);
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (TRUE);

-- VIP PICKS Policy (STRICT: ACTIVE VIP MEMBERS & ADMINS ONLY)
CREATE POLICY "VIP picks viewable by active VIP members and admins only"
    ON public.vip_picks FOR SELECT
    USING (
        (status = 'published' AND publish_at <= NOW() AND public.is_active_vip(auth.uid()))
        OR public.is_admin()
    );

-- ADMIN ALL POLICIES FOR CONTENT MANAGERS
CREATE POLICY "Admin write meetings" ON public.meetings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin write races" ON public.races FOR ALL USING (public.is_admin());
CREATE POLICY "Admin write free_picks" ON public.free_picks FOR ALL USING (public.is_admin());
CREATE POLICY "Admin write vip_picks" ON public.vip_picks FOR ALL USING (public.is_admin());
CREATE POLICY "Admin write results" ON public.results FOR ALL USING (public.is_admin());
CREATE POLICY "Admin write testimonials" ON public.testimonials FOR ALL USING (public.is_admin());
CREATE POLICY "Admin write faq" ON public.faq FOR ALL USING (public.is_admin());
CREATE POLICY "Admin write site_content" ON public.site_content FOR ALL USING (public.is_admin());
CREATE POLICY "Admin write settings" ON public.settings FOR ALL USING (public.is_admin());

-- MESSAGES & VIP REQUESTS Policies
CREATE POLICY "Anyone can insert messages" ON public.messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin read/manage messages" ON public.messages FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can insert vip_requests" ON public.vip_requests FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin read/manage vip_requests" ON public.vip_requests FOR ALL USING (public.is_admin());

-- ACCESS LOGS Policies
CREATE POLICY "Admin view access_logs" ON public.access_logs FOR SELECT USING (public.is_admin());

-- =========================================================================
-- SECURE SERVER-SIDE ACCESS CODE VALIDATION RPC FUNCTION
-- =========================================================================

CREATE OR REPLACE FUNCTION public.verify_access_code(
    p_code TEXT,
    p_user_id UUID DEFAULT auth.uid()
)
RETURNS JSONB AS $$
DECLARE
    v_code_hash TEXT;
    v_record public.access_codes%ROWTYPE;
    v_recent_failures INT;
    v_days_to_add INT;
    v_end_date TIMESTAMPTZ;
BEGIN
    IF p_user_id IS NULL THEN
        RETURN jsonb_build_object('success', FALSE, 'code', 'UNAUTHORIZED', 'message', 'Vous devez être connecté pour valider un code.');
    END IF;

    -- Check rate limiting: max 5 failed attempts in last 15 minutes
    SELECT COUNT(*) INTO v_recent_failures
    FROM public.access_logs
    WHERE user_id = p_user_id
      AND action = 'CODE_VERIFICATION'
      AND status = 'FAILED'
      AND created_at > (NOW() - INTERVAL '15 minutes');

    IF v_recent_failures >= 5 THEN
        INSERT INTO public.access_logs (user_id, action, status, details)
        VALUES (p_user_id, 'CODE_VERIFICATION', 'BLOCKED', jsonb_build_object('reason', 'rate_limit_exceeded'));

        RETURN jsonb_build_object('success', FALSE, 'code', 'TOO_MANY_ATTEMPTS', 'message', '⚠️ Trop de tentatives infructueuses. Veuillez réessayer dans 15 minutes.');
    END IF;

    -- Compute SHA-256 hash of input code
    v_code_hash := encode(digest(p_code, 'sha256'), 'hex');

    -- Search for code hash
    SELECT * INTO v_record
    FROM public.access_codes
    WHERE code_hash = v_code_hash;

    IF v_record.id IS NULL THEN
        INSERT INTO public.access_logs (user_id, action, status, details)
        VALUES (p_user_id, 'CODE_VERIFICATION', 'FAILED', jsonb_build_object('reason', 'invalid_code'));

        RETURN jsonb_build_object('success', FALSE, 'code', 'INVALID', 'message', '❌ Code d''accès VIP incorrect.');
    END IF;

    IF NOT v_record.active THEN
        INSERT INTO public.access_logs (user_id, action, status, details)
        VALUES (p_user_id, 'CODE_VERIFICATION', 'FAILED', jsonb_build_object('reason', 'disabled_code', 'code_id', v_record.id));

        RETURN jsonb_build_object('success', FALSE, 'code', 'DISABLED', 'message', '🚫 Ce code d''accès VIP a été désactivé.');
    END IF;

    IF v_record.expires_at IS NOT NULL AND v_record.expires_at < NOW() THEN
        INSERT INTO public.access_logs (user_id, action, status, details)
        VALUES (p_user_id, 'CODE_VERIFICATION', 'FAILED', jsonb_build_object('reason', 'expired_code', 'code_id', v_record.id));

        RETURN jsonb_build_object('success', FALSE, 'code', 'EXPIRED', 'message', '⏳ Ce code d''accès VIP a expiré.');
    END IF;

    IF v_record.usage = 'single' AND v_record.used_count > 0 THEN
        INSERT INTO public.access_logs (user_id, action, status, details)
        VALUES (p_user_id, 'CODE_VERIFICATION', 'FAILED', jsonb_build_object('reason', 'already_used', 'code_id', v_record.id));

        RETURN jsonb_build_object('success', FALSE, 'code', 'ALREADY_USED', 'message', '🔁 Ce code à usage unique a déjà été utilisé.');
    END IF;

    -- CODE IS VALID! Grant VIP Subscription
    IF v_record.plan = 'weekly' THEN v_days_to_add := 7;
    ELSIF v_record.plan = 'monthly' THEN v_days_to_add := 30;
    ELSIF v_record.plan = 'yearly' THEN v_days_to_add := 365;
    ELSE v_days_to_add := 30;
    END IF;

    v_end_date := NOW() + (v_days_to_add || ' days')::INTERVAL;

    -- Update access code record
    UPDATE public.access_codes
    SET used_count = used_count + 1,
        user_id = p_user_id
    WHERE id = v_record.id;

    -- Upsert VIP subscription
    INSERT INTO public.subscriptions (user_id, plan, start_date, end_date, status)
    VALUES (p_user_id, v_record.plan, NOW(), v_end_date, 'active')
    ON CONFLICT (id) DO UPDATE
    SET plan = EXCLUDED.plan,
        start_date = EXCLUDED.start_date,
        end_date = EXCLUDED.end_date,
        status = 'active';

    -- Log success
    INSERT INTO public.access_logs (user_id, action, status, details)
    VALUES (p_user_id, 'CODE_VERIFICATION', 'SUCCESS', jsonb_build_object('plan', v_record.plan, 'expires_at', v_end_date));

    RETURN jsonb_build_object(
        'success', TRUE,
        'code', 'AUTHORIZED',
        'message', '✅ ACCÈS AUTORISÉ ! Votre espace VIP est maintenant déverrouillé.',
        'plan', v_record.plan,
        'expires_at', v_end_date
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
