import React from 'react'
import Avatar from 'react-avatar'

interface AvatarProps {
  name: string
  size: string
}

const AvatarLetter = (props: AvatarProps) => {
  const { name, size } = props

  return (
    <>
      <Avatar name={name} round size={size} color={'#7a1fa2'} />
    </>
  )
}
export default AvatarLetter
