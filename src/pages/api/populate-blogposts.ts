import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getBlogposts } from 'src/mock'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return
  }

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
  const usersCursor = db.collection('users').find({})
  const users = await usersCursor.toArray()

  const blogpostsCollection = db.collection('blogposts')
  const bulk = blogpostsCollection.initializeUnorderedBulkOp()

  const getUser = (name: string) => users.find((user) => user.name === name)

  const posts = getBlogposts()
  posts.forEach((post) =>
    bulk.insert({
      authorId: getUser(post.author.name)?._id.toString(),
      category: post.category,
      content: post.content,
      date: post.date.toISOString(),
      description: post.description,
      imageUrl: post.imageUrl,
      readingTime: post.readingTime as unknown as string,
      title: post.title
    })
  )
  await bulk.execute().catch(console.error)
  await client.close()

  res.status(201).json({ message: 'Posts inserted' })
}
