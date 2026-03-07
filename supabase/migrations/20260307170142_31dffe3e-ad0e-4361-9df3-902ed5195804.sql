
-- Leads table to store all survey submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT NOT NULL,
  name TEXT,
  whatsapp TEXT,
  province TEXT,
  matched_strain TEXT,
  compatibility TEXT,
  strain_thc TEXT,
  strain_cbd TEXT,
  strain_price TEXT,
  strain_effects TEXT,
  strain_flavours TEXT,
  strain_shop_url TEXT,
  survey_answers JSONB DEFAULT '{}'::jsonb,
  source TEXT DEFAULT 'healing-buds-biomap'
);

-- RLS: only authenticated admins can read leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow the service role (edge functions) to insert
CREATE POLICY "Service role can insert leads"
  ON public.leads FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow authenticated users to read (admin dashboard)
CREATE POLICY "Authenticated users can read leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (true);
