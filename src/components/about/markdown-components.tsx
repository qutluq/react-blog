import type { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import type { NormalComponents } from 'react-markdown/lib/complex-types'

type MDType = Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
>

export const MDComponents: MDType = {
  h1: ({ ...props }) => (
    <h1 className="py-1 text-lg font-bold text-black" {...props} />
  ),
  h2: ({ ...props }) => (
    <h2 className="text-md py-1 font-bold text-black" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="text-md py-1 font-semibold text-black" {...props} />
  ),
  p: ({ ...props }) => <p className="py-1 text-sm text-gray-500" {...props} />,
  img: ({ ...props }) => (
    <img className="w-full rounded-lg py-1 text-sm text-gray-500" {...props} />
  )
}
