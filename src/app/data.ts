"use server"
import prisma from '@/lib/prisma'

export async function getBlogs() {
  try {
    const response = await fetch('/api/blogs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    if (!response.ok) throw new Error('Failed to fetch blogs')
    return response.json()
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export async function getBlogById(id: number) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: id
      }
    })
    return blog
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}
