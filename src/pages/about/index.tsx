import { MongoClient } from 'mongodb'
import { About as AboutLayout } from 'src/components/about'

const About = ({ content }: { content: string }) => {
  return <AboutLayout content={content} />
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

  const aboutCursor = db.collection('about').find({})
  const aboutObject = (await aboutCursor.toArray())[0]

  await client.close()

  return {
    props: {
      content: aboutObject.content
    }
  }
}

export default About
