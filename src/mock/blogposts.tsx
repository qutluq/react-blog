import { BlogPost } from '../components/blog/types'
import blogpostsJson from './blogposts.json'
import { getUsers } from './users'

export const getBlogposts = () => {
  const users = getUsers()

  return blogpostsJson.map((post) => {
    // copy all fields except authorId
    const { authorId, ...otherFields } = post
    const author = users.find((user) => user.id === authorId)
    return { ...otherFields, date: new Date(post.date), author }
  }) as BlogPost[]
}
