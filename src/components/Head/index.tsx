import NextHead from 'next/head'
import { useRouter } from 'next/router'

type PropTypes = {
  title: string
  description: string
  image?: string
  date?: string
}

export const Head = (meta: PropTypes) => {
  const router = useRouter()

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta
        property="og:url"
        content={`https://react-blog.io${router.asPath}`}
      />
      <link rel="canonical" href={`https://react-blog.io${router.asPath}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="React Blog" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      {meta.image !== null && <meta property="og:image" content={meta.image} />}
      {meta.date !== null && (
        <meta property="article:published_time" content={meta.date} />
      )}

      <meta charSet="UTF-8" key="charset" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1"
        key="viewport"
      />
      <link
        rel="apple-touch-icon"
        href="/assets/apple-touch-icon.png"
        key="apple"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicon-32x32.png"
        key="icon32"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicon-16x16.png"
        key="icon16"
      />
      <link rel="icon" href="/assets/favicon.ico" key="favicon" />
    </NextHead>
  )
}
