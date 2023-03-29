import React from 'react'
import Avatar from 'react-avatar'

interface AvatarProps {
  name: string
}
function randomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}
const AvatarLetter = (props: AvatarProps) => {
  const { name } = props
  const color = randomColor()
  return (
    <>
      <Avatar name={name} round size='38' color={color} />
    </>
  )
}
export default AvatarLetter
