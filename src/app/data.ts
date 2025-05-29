// supabase/functions/get-blogs.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function getBlogs() {
  try {
    const { data, error } = await supabase
      .from('blog')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw new Error('Failed to fetch blogs')
  }
}
