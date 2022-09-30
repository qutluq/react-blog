import { MongoClient, ObjectId } from 'mongodb'
import type { Blogpost, BlogpostJson } from 'src/components/blog'
import { Posts as PostsLayout } from 'src/components/blog'
import { Head } from 'src/components/head'
import { Pagination, usePagination } from 'src/components/pagination'
import { User } from 'src/components/user'
import { SiteDescription, SiteName } from 'src/config/site'
import { serializeMongoObject } from 'src/utils'

const convertBlogposts = (blogposts: BlogpostJson[], users: User[]) => {
  return blogposts.map((post) => {
    // copy all fields except authorId
    // const { authorId, ...otherFields } = post
    const author = users.find((user) => user.id === post.authorId)
    return { ...post, date: new Date(post.date), author }
  }) as Blogpost[]
}

const Posts = ({
  blogposts,
  users
}: {
  blogposts: BlogpostJson[]
  users: User[]
}) => {
  const { items, currentPage, setCurrentPage, totalPages } = usePagination(
    convertBlogposts(blogposts, users)
  )

  return (
    <>
      <Head
        title={`${SiteName} - Blog posts`}
        description={SiteDescription}
        image="/assets/android-chrome-512x512.png"
      />
      <PostsLayout posts={items} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  )
}

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
      blogposts: blogposts.map((post) => serializeMongoObject(post)),
      users: users.map((user) => serializeMongoObject(user))
    }
  }
}

export default Posts
