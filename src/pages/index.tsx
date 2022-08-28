import { MongoClient } from 'mongodb'
import Head from 'next/head'
import type { Blogpost } from 'src/components/blog'
import { Posts } from 'src/components/blog'
import { Pagination, usePagination } from 'src/components/pagination'
import { User } from 'src/components/user'
import usersJson from 'src/mock/users.json'

type BlogpostJson = {
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

const getUsers = () => {
  return usersJson as User[]
}

const convertBlogposts = (blogposts: BlogpostJson[]) => {
  const users = getUsers()

  return blogposts.map((post) => {
    // copy all fields except authorId
    const { authorId, ...otherFields } = post
    const author = users.find((user) => user.id === authorId)
    return { ...otherFields, date: new Date(post.date), author }
  }) as Blogpost[]
}

const Home = ({ blogposts }: { blogposts: BlogpostJson[] }) => {
  const { items, currentPage, setCurrentPage, totalPages } = usePagination(
    convertBlogposts(blogposts)
  )

  return (
    <div className="flex flex-col gap-3">
      <Head>
        <title>Header</title>
        <meta
          name="description"
          content="React blog using next.js and tailwind css with github source code"
        />
      </Head>

      <main>
        <Posts posts={items} />
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
  await client.close()

  return {
    props: {
      blogposts: blogposts.map((post) => {
        const { _id, ...otherProps } = post
        return { ...otherProps, id: post._id.toString() }
      })
    }
  }
}

export default Home
