import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MDComponents } from 'src/components/about/markdown-components'

export const About = ({ content }: { content: string }) => {
  return (
    <div className="mx-auto p-4 text-gray-500">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={MDComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
