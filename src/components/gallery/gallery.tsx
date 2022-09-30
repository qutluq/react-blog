import { GalleryImage } from 'src/components/gallery'

export const Gallery = ({ images }: { images: GalleryImage[] }) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-1 gap-y-1 p-4 sm:grid-cols-3 lg:grid-cols-4"
    >
      {images.map((image) => (
        <li key={image.id} className="relative text-gray-900">
          <div className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={image.imageURL}
              alt={image.title}
              className="object-cover hover:opacity-75"
            />
          </div>
          <p className="mt-2 block truncate px-1 text-sm font-medium">
            {image.title}
          </p>
          <p className="px-1 pb-2">
            photo by <a href={image.authorURL}>{image.author}</a>
          </p>
        </li>
      ))}
    </ul>
  )
}
