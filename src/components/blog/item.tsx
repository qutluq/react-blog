import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Blogpost } from 'src/components/blog/types'
import { dateToString } from 'src/utils'

export const Item = ({ post }: { post: Blogpost }) => {
  return (
    <Fragment>
      <div className="flex-shrink-0">
        <div className="relative h-48 w-full">
          <Image
            priority={true}
            layout="fill"
            className="h-full w-full object-cover"
            src={post.imageUrl}
            alt="featured image"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <Link href="#" className="hover:underline">
              <a>{post.category}</a>
            </Link>
          </p>
          <Link href={`posts/${post.id}`} className="mt-2 block cursor-pointer">
            <a>
              <p className="text-xl font-semibold text-gray-900">
                {post.title}
              </p>
            </a>
          </Link>
          <Link href={`posts/${post.id}`} className="mt-2 block cursor-pointer">
            <a>
              <p className="mt-3 h-24 overflow-hidden text-base text-gray-500">
                {post.description}
              </p>
            </a>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <Link href={`/user/${post.author.id}`}>
              <a>
                <Image
                  width={40}
                  height={40}
                  className="border-1 rounded-full border border-solid border-gray-300"
                  src={post.author.imageUrl}
                  alt="author image"
                />
                <span className="sr-only">{post.author.name}</span>
              </a>
            </Link>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <Link
                href={`/user/${post.author.id}`}
                className="hover:underline"
              >
                <a>{post.author.name}</a>
              </Link>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={post.date.toDateString()}>
                {dateToString({
                  date: post.date,
                  month: 'short',
                  weekday: 'short'
                })}
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
