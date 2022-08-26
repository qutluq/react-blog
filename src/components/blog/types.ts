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
