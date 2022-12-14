import { MongoClient, ObjectId } from 'mongodb'
import type { Blogpost, BlogpostJson } from 'src/components/blog'
import { Post as PostLayout } from 'src/components/blog'
import { Head } from 'src/components/head'
import { User } from 'src/components/user'
import { SiteName } from 'src/config/site'
import { serializeMongoObject } from 'src/utils'

const convertBlogpost = (blogpost: BlogpostJson, user: User) => {
  const post: Blogpost = {
    ...blogpost,
    date: new Date(blogpost.date),
    author: user
  }
  return post
}

type PropTypes = {
  post: BlogpostJson
  user: User
}

const Post = ({ post, user }: PropTypes) => {
  const blogpost = convertBlogpost(post, user)
  return (
    <>
      <Head
        title={`${SiteName} - ${post.title}`}
        description={post.description}
        image={post.imageUrl}
        date={post.date}
      />

      <PostLayout post={blogpost} />
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
  const blogpostsCursor = db.collection('blogposts').find({})
  const blogposts = await blogpostsCursor.toArray()
  await client.close()

  const paths = blogposts.map((post) => ({
    params: { postID: String(post._id) }
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

  const postID = new ObjectId(params.postID)
  const blogpostCursor = db.collection('blogposts').find({ _id: postID })
  const blogpost = (await blogpostCursor.toArray())[0]

  const userID = new ObjectId(blogpost.authorId)
  const user = (await db.collection('users').find({ _id: userID }).toArray())[0]

  await client.close()

  return {
    props: {
      post: serializeMongoObject(blogpost),
      user: serializeMongoObject(user)
    }
  }
}

export default Post
