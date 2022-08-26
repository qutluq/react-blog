import { Blogpost } from 'src/components/blog/types'
import blogpostsJson from 'src/mock/blogposts.json'
import { getUsers } from 'src/mock/users'

export const getBlogposts = () => {
  const users = getUsers()

  return blogpostsJson.map((post) => {
    // copy all fields except authorId
    const { authorId, ...otherFields } = post
    const author = users.find((user) => user.id === authorId)
    return { ...otherFields, date: new Date(post.date), author }
  }) as Blogpost[]
}
