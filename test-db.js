import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // Test connection
    const { data, error } = await supabase
      .from('blog')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Error connecting to Supabase:', error.message)
      return
    }

    console.log('Successfully connected to Supabase!')
    console.log('Blog table exists and contains:', data.length, 'entries')
    
    if (data.length > 0) {
      console.log('Sample blog entry:', data[0])
    }
  } catch (err) {
    console.error('Failed to connect:', err.message)
  }
}

testConnection() 