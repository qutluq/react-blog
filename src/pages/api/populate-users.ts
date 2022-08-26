import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUsers } from 'src/mock'

type dbUser = {
  name: string
  imageUrl: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV !== 'development') return
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
  const usersCollection = db.collection('users')
  const bulk = usersCollection.initializeUnorderedBulkOp()

  const users = getUsers()
  users.forEach((user: dbUser) => {
    bulk.insert({ name: user.name, imageUrl: user.imageUrl })
  })

  await bulk.execute().catch(console.error)
  await client.close()

  res.status(201).json({ message: 'Users inserted' })
}
