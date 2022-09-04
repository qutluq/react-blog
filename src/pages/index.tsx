import { MongoClient, ObjectId } from 'mongodb'
import Home from 'src/pages/posts'

export async function getStaticProps() {
  if (
    process.env.REACT_APP_DB_USER === undefined ||
    process.env.REACT_APP_DB_PASSWORD === undefined
  ) {
    return
  }

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASSWORD}@cluster0.meald80.mongodb.net/blog?retryWrites=true&w=majority`
  )

  if (client === undefined) return

  const db = client.db()

  const blogpostsCursor = db.collection('blogposts').find({})
  const blogposts = await blogpostsCursor.toArray()

  const userIDs = blogposts.map((post) => new ObjectId(post.authorId))
  const usersCollection = db.collection('users').find({ _id: { $in: userIDs } })
  const users = await usersCollection.toArray()
  await client.close()

  return {
    props: {
      blogposts: blogposts.map((post) => {
        const { _id, ...otherProps } = post
        return { ...otherProps, id: post._id.toString() }
      }),
      users: users.map((user) => {
        const { _id, ...otherProps } = user
        return { ...otherProps, id: user._id.toString() }
      })
    }
  }
}

export default Home
