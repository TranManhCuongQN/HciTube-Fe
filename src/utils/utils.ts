import { AxiosError } from 'axios'
/* eslint-disable import/no-named-as-default-member */
import axios from 'axios'

import { ErrorResponse } from 'src/types/utils.type'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

//  Lỗi 404
export function isAxiosNotFoundError<NotFoundError>(error: unknown): error is AxiosError<NotFoundError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.NotFound
}

// Lỗi 400
export function isAxiosBadRequestError<BadRequestError>(error: unknown): error is AxiosError<BadRequestError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

//  Lỗi 401
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

// token hết hạn
export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.message === 'TokenExpiredError'
  )
}

// convert
export function convertNumberToDisplayString(num: number): string {
  if (num) {
    const absNum = Math.abs(num)
    if (absNum >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B'
    } else if (absNum >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M'
    } else if (absNum >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K'
    } else {
      return num.toString()
    }
  }
  return num?.toString()
}

export function getFormattedDate(dates: string) {
  const date = new Date(dates)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const formattedDate = date.toLocaleDateString(
    'vi-VN',
    options as {
      year: 'numeric'
      month: 'short'
      day: 'numeric'
    }
  )
  return formattedDate
}

export function convertBytesToMB(bytes: number) {
  const megabytes = bytes / (1024 * 1024)
  return megabytes.toFixed(2)
}

export const getPublicId = (imageURL: string) => {
  const getPublicId = `youtube-clone/video/${imageURL?.split('/')?.pop()?.split('.')[0]}`
  return getPublicId
}

export const convertDuration = (duration: number) => {
  if (!duration) return '00:00'
  const result = new Date(duration * 1000)?.toISOString()?.slice(11, 19)
  const hour = result.slice(0, 2)
  const minute = result.slice(3, 5)
  const second = result.slice(6, 8)
  return hour !== '00' ? `${hour}:${minute}:${second}` : `${minute}:${second}`
}

// export function convertToRelativeTime(timestamp: string): string {
//   const now = new Date()
//   const datetimeObj = new Date(timestamp)
//   const timeDelta = now.getTime() - datetimeObj.getTime()

//   const secondsPerMinute = 60
//   const secondsPerHour = 60 * secondsPerMinute
//   const secondsPerDay = 24 * secondsPerHour
//   const secondsPerWeek = 7 * secondsPerDay
//   const secondsPerMonth = 30 * secondsPerDay
//   const secondsPerYear = 365 * secondsPerDay

//   if (timeDelta >= secondsPerYear * 1000) {
//     const years = Math.floor(timeDelta / (secondsPerYear * 1000))
//     return `${years} năm trước`
//   } else if (timeDelta >= secondsPerMonth * 1000) {
//     const months = Math.floor(timeDelta / (secondsPerMonth * 1000))
//     return `${months} tháng trước`
//   } else if (timeDelta >= secondsPerWeek * 1000) {
//     const weeks = Math.floor(timeDelta / (secondsPerWeek * 1000))
//     return `${weeks} tuần trước`
//   } else if (timeDelta >= secondsPerDay * 1000) {
//     const days = Math.floor(timeDelta / (secondsPerDay * 1000))
//     return `${days} ngày trước`
//   } else if (timeDelta >= secondsPerHour * 1000) {
//     const hours = Math.floor(timeDelta / (secondsPerHour * 1000))
//     return `${hours} giờ trước`
//   } else if (timeDelta >= secondsPerMinute * 1000) {
//     const minutes = Math.floor(timeDelta / (secondsPerMinute * 1000))
//     return `${minutes} phút trước`
//   } else {
//     const seconds = Math.floor(timeDelta / 1000)
//     return `${seconds} giây trước`
//   }
// }

export const convertToRelativeTime = (createdAtInString: string) => {
  const createdAtInDate = new Date(createdAtInString)
  const currentDateTime = new Date()
  const diffInMs = currentDateTime.getTime() - createdAtInDate.getTime()
  const diffInSecond = Math.floor(diffInMs / 1000)
  const diffInMinute = Math.floor(diffInMs / 60000)
  const diffInHours = Math.floor(diffInMs / 3600000)
  const diffInDay = Math.floor(diffInMs / 86400000)

  let timeDifference = ' '

  if (diffInDay >= 1) {
    timeDifference = `${diffInDay} ngày trước`
  } else if (diffInHours >= 1) {
    timeDifference = `${diffInHours} giờ trước`
  } else if (diffInMinute >= 1) {
    timeDifference = `${diffInMinute} phút trước`
  } else if (diffInSecond >= 1) {
    timeDifference = `${diffInSecond} giây trước`
  }

  return timeDifference
}
