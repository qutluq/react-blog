import { MongoClient } from 'mongodb'
import { Gallery, GalleryImage } from 'src/components/gallery'
import { serializeMongoObject } from 'src/utils'

const gallery = ({ images }: { images: GalleryImage[] }) => (
  <Gallery images={images} />
)

export const getStaticProps = async () => {
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

  const images = await db.collection('gallery').find({}).toArray()

  await client.close()

  return {
    props: {
      images: images.map((image) => serializeMongoObject(image))
    }
  }
}

export default gallery
