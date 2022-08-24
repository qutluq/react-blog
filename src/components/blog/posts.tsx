import type { BlogPost } from 'src/components/blog'
import { Item } from 'src/components/blog'

type PropTypes = { posts: BlogPost[] }

export const Posts = ({ posts }: PropTypes) => {
  return (
    <div className="bg-gray-50 p-16 px-4">
      <div className="flex max-w-7xl flex-col items-center gap-3">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            From the blog
          </h2>
          <p className="max-w-md text-lg text-gray-500 lg:max-w-2xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            libero labore natus atque, ducimus sed.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <Item post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
