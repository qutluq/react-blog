import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Blogpost, MDComponentsPost } from 'src/components/blog'
import { dateToString } from 'src/utils'

export const Post = ({ post }: { post: Blogpost }) => {
  return (
    <div className="relative overflow-hidden bg-white py-16">
      <div className="relative flex flex-col gap-3 px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-96 mx-auto flex flex-row text-gray-500">
          <div className="px-3">
            <Link href={`/user/${post.author.id}`}>
              <a>
                <Image
                  width={50}
                  height={50}
                  src={post.author.imageUrl}
                  alt={'author image'}
                  className="rounded-full"
                />
              </a>
            </Link>
          </div>

          <div className="flex flex-col items-start justify-around">
            <Link href={`/user/${post.author.id}`}>
              <a>
                <span>{post.author.name}</span>
              </a>
            </Link>
            <div className="mx-auto h-auto w-auto">
              <span>{`${dateToString({
                date: post.date,
                month: 'short'
              })} ● ${post.readingTime} min read`}</span>
            </div>
          </div>
        </div>
        <div className="relative h-48 w-full">
          <Image
            priority={true}
            layout="fill"
            className="h-full w-full object-cover"
            src={post.imageUrl}
            alt={'post image'}
          />
        </div>
        <div className="mx-auto  text-gray-500">
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
