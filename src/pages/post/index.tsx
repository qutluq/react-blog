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
        <meta name="description" content="Blog posts" />
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

export default Home
