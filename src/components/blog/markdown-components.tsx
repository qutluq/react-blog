import type { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import type { NormalComponents } from 'react-markdown/lib/complex-types'

type mdType = Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
>

export const MDComponentsPost: mdType = {
  h1: ({ ...props }) => (
    <h1 className="py-1 text-lg font-bold text-black" {...props} />
  ),
  p: ({ ...props }) => <p className="py-1 text-sm text-gray-500" {...props} />
}
