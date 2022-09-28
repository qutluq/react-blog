// eslint-disable-next-line simple-import-sort/imports
import {
  BriefcaseIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PhoneArrowDownLeftIcon,
  PhoneIcon
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import type { Blogpost } from 'src/components/blog'
import type { User } from 'src/components/user'
import { dateToString } from 'src/utils'

type PropTypes = {
  user: User
  posts: Blogpost[]
}

export const Profile = ({ user, posts }: PropTypes) => {
  return (
    <div>
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={user.backgroundImage}
          alt=""
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={user.imageUrl}
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {user.name}
              </h1>
            </div>
            <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <EnvelopeIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Message</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <PhoneArrowDownLeftIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Call</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">
            {user.name}
          </h1>
        </div>
        <div className="m-2 flex flex-col sm:flex-wrap lg:flex-row lg:gap-3">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {user.title}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <GlobeAltIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {user.location}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <EnvelopeIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {user.email}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <PhoneIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {user.phone}
          </div>
        </div>
      </div>

      <div className="max-w-6/12 px-7 pt-3">
        <h1 className="text-md font-medium">Latest articles</h1>
        <ul role="list" className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id} className="py-4">
              <Link href={`/posts/${post.id}`}>
                <a>
                  <div className="flex flex-row space-x-3">
                    <Image
                      width={48}
                      height={48}
                      className="rounded-md"
                      src={post.imageUrl}
                      alt="featured image"
                    />
                    <div className="flex flex-col items-start">
                      <h3 className="text-sm font-medium">{post.title}</h3>
                      <p className="text-sm text-gray-500">
                        {dateToString({ date: post.date, month: 'short' })}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
