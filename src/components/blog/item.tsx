import Link from 'next/link'
import { Fragment } from 'react'
import { BlogPost } from 'src/components/blog/types'
import { dateToString } from 'src/utils'

export const Item = ({ post }: { post: BlogPost }) => {
  return (
    <Fragment>
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={post.imageUrl} alt="" />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <Link href="#" className="hover:underline">
              {post.category}
            </Link>
          </p>
          <a href={`post/${post.id}`} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">{post.title}</p>
            <p className="mt-3 text-base text-gray-500">{post.description}</p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <Link href={post.author?.profileUrl}>
              <img
                className="border-1 h-10 w-10 rounded-full border border-solid border-gray-300"
                src={post.author?.imageUrl}
                alt=""
              />
            </Link>
            <Link href={post.author?.profileUrl}>
              <span className="sr-only">{post.author?.name}</span>
            </Link>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <Link href={post.author?.profileUrl} className="hover:underline">
                {post.author?.name}
              </Link>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={post.date.toDateString()}>
                {dateToString(post.date)}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
