interface AvatarProps {
  name: string
  className?: string
  classNameChild?: string
}

function stringToColor(name: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < name?.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

const AvatarLetter = (props: AvatarProps) => {
  const { name, className, classNameChild } = props
  return (
    <>
      <div
        className={`${className} flex flex-shrink-0 items-center justify-center rounded-full`}
        style={{ backgroundColor: stringToColor(name) }}
      >
        <span
          className={`${classNameChild} flex h-full w-full flex-shrink-0 items-center justify-center font-medium text-white`}
        >
          {name[0]}
        </span>
      </div>
    </>
  )
}
export default AvatarLetter
