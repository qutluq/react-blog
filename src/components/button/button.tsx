import type { ComponentProps } from 'react'
import { classNames } from 'src/utils'

type ButtonProps = ComponentProps<'button'> & {
  isRounded?: boolean
  hasBorder?: boolean
}

export const Button = ({
  className = '',
  hasBorder = true,
  isRounded = false,
  ...props
}: ButtonProps) => {
  const css = classNames(
    'flex justify-center gap-1 bg-sky-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-sky-600 active:bg-sky-700',
    className,
    hasBorder && 'border',
    isRounded && 'rounded-md'
  )

  return <button {...props} className={css} />
}
