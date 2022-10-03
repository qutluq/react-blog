type PropTypes = {
  name: string
  size?: number
}

export const Icon = ({ name, size = 24 }: PropTypes) => (
  <svg
    height={`${size}px`}
    width={`${size}px`}
    viewBox={`0 0 ${size} ${size}`}
    className={name}
  >
    <use href={`/assets/icons.svg#${name}`} />
  </svg>
)
