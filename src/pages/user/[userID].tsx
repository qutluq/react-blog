import { MongoClient, ObjectId } from 'mongodb'
import type { Blogpost, BlogpostJson } from 'src/components/blog'
import { Head } from 'src/components/head'
import type { User as UserType } from 'src/components/user'
import { Profile } from 'src/components/user'
import { SiteName } from 'src/config/site'
import { serializeMongoObject } from 'src/utils'

const convertBlogpost = (blogpost: BlogpostJson, user: UserType) => {
  const post: Blogpost = {
    ...blogpost,
    date: new Date(blogpost.date),
    author: user
  }
  return post
}

type PropTypes = {
  posts: BlogpostJson[]
  user: UserType
}

const User = ({ posts, user }: PropTypes) => {
  const blogposts = posts.map((post) => convertBlogpost(post, user))
  return (
    <>
      <Head
        title={`${SiteName} - ${user.name}`}
        description={`${user.name} - Profile`}
        image={user.imageUrl}
      />

      <Profile user={user} posts={blogposts} />
    </>
  )
}

export const getStaticPaths = async () => {
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
  const usersCursor = db.collection('users').find({})
  const users = await usersCursor.toArray()
  await client.close()

  const paths = users.map((user) => ({
    params: { userID: String(user._id) }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: { params: any }) => {
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

  const userID = new ObjectId(params.userID)
  const user = (await db.collection('users').find({ _id: userID }).toArray())[0]

  const blogpostCursor = db
    .collection('blogposts')
    .find({ authorId: params.userID })
  const blogposts = await blogpostCursor.toArray()

  await client.close()

  return {
    props: {
      posts: blogposts.map((blogpost) => serializeMongoObject(blogpost)),
      user: serializeMongoObject(user)
    }
  }
}

export default User
