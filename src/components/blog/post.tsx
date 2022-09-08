import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Blogpost, MDComponentsPost } from 'src/components/blog'

export const Post = ({ post }: { post: Blogpost }) => {
  return (
    <div className="relative overflow-hidden bg-white py-16">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="block text-center text-base font-semibold uppercase tracking-wide text-indigo-600">
              {post.category}
            </span>
            <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {post.title}
            </span>
          </h1>
        </div>
        <div className="mx-auto mt-6 text-gray-500">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MDComponentsPost}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
