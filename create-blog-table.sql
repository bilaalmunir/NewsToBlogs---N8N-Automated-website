-- Create the blog table
CREATE TABLE IF NOT EXISTS public.blog (
    id SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved_by TEXT NOT NULL,
    blog TEXT NOT NULL
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.blog ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.blog
    FOR SELECT
    USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert" ON public.blog
    FOR INSERT
    TO authenticated
    WITH CHECK (true); 