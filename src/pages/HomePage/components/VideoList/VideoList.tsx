import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import VideoItem from '../VideoItem/VideoItem'

const InforVideo = [
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85
  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 127,
    videoDuration: 216.85
  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 60,
    videoDuration: 216.85

  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85
  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 10,
    videoDuration: 216.85
  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85
  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85

  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85

  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85

  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85


  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85


  },
  {
    thumbnail: 'https://i.ytimg.com/vi/TOI0keZyzYo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDJif58-vZgK74wfHBfAbWS-r1dnA',
    avatar: 'https://i.pinimg.com/564x/07/62/6d/07626d571a0345c94de4efb57a0fe3b3.jpg',
    title: '2 HOURS WORK & STUDY WITH ME🕯📝  | REAL TIME | no breaks | 🎧 Focused Lofi study Music',
    user: 'Mạnh Cường',
    view: 10,
    dataSubmitted: 1,
    lastPlayedTime: 0,
    videoDuration: 216.85

  }
]

const VideoList = () => {
  return (
    <div
      className={`md:mt-4 md:px-3 lg:mt-0 lg:pt-6 lg:px-16 grid grid-cols-1 flex-wrap overflow-y-auto md:grid-cols-2 md:gap-5 lg:grid-cols-3`}
    >
      {InforVideo.map((item, index) => (
        <VideoItem key={index} data={item} />
      ))}
    </div>
  )
}

export default VideoList
