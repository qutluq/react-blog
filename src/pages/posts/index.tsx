import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'
import type { Blogpost, BlogpostJson } from 'src/components/blog'
import { Posts as PostsLayout } from 'src/components/blog'
import { Pagination, usePagination } from 'src/components/pagination'
import { User } from 'src/components/user'

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
    <div className="flex flex-col gap-3">
      <Head>
        <title>Header</title>
        <meta name="description" content="Blog posts" />
      </Head>

      <main>
        <PostsLayout posts={items} />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </main>

      <footer className="flex flex-row text-start">
        <span>Footer info</span>
      </footer>
    </div>
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

export default Posts
