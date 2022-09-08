import { User } from 'src/components/user/types'

export type Blogpost = {
  id: string
  author: User
  category: string
  content: string
  date: Date
  description: string
  imageUrl: string
  readingTime: number
  title: string
}

export type BlogpostJson = {
  id: string
  authorId: string
  category: string
  content: string
  date: string
  description: string
  imageUrl: string
  readingTime: number
  title: string
}
