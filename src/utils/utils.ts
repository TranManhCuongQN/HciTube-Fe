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
  return '0'
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

export function convertDuration(duration: string) {
  const hours = Math.floor(Number(duration) / 3600)
  const minutes = Math.floor((Number(duration) % 3600) / 60)
  const seconds = Number(duration) % 60
  let formattedDuration = ''
  if (hours > 0) {
    formattedDuration += hours.toString() + ':'
  }

  if (minutes < 10) {
    formattedDuration += '0'
  }
  formattedDuration += minutes.toString() + ':'

  if (seconds < 10) {
    formattedDuration += '0'
  }
  formattedDuration += seconds.toString()

  return formattedDuration
}

export function convertBytesToMB(bytes: number) {
  const megabytes = bytes / (1024 * 1024)
  return megabytes.toFixed(2)
}

export const getPublicId = (imageURL: string) => {
  const getPublicId = `youtube-clone/video/${imageURL?.split('/')?.pop()?.split('.')[0]}`
  return getPublicId
}

export function convertToRelativeTime(timestamp: string): string {
  const now = new Date()
  const datetimeObj = new Date(timestamp)
  const timeDelta = now.getTime() - datetimeObj.getTime()
  const secondsPerMinute = 60
  const secondsPerHour = secondsPerMinute * 60
  const secondsPerDay = secondsPerHour * 24
  const secondsPerWeek = secondsPerDay * 7
  const secondsPerMonth = secondsPerDay * 30
  const secondsPerYear = secondsPerDay * 365

  if (timeDelta >= secondsPerYear * 1000) {
    const years = Math.floor(timeDelta / (secondsPerYear * 1000))
    return `${years} năm trước`
  } else if (timeDelta >= secondsPerMonth * 1000) {
    const months = Math.floor(timeDelta / (secondsPerMonth * 1000))
    return `${months} tháng trước`
  } else if (timeDelta >= secondsPerWeek * 1000) {
    const weeks = Math.floor(timeDelta / (secondsPerWeek * 1000))
    return `${weeks} tuần trước`
  } else if (timeDelta >= secondsPerDay * 1000) {
    const days = Math.floor(timeDelta / (secondsPerDay * 1000))
    return `${days} ngày trước`
  } else if (timeDelta >= secondsPerHour * 1000) {
    const hours = Math.floor(timeDelta / (secondsPerHour * 1000))
    return `${hours} giờ trước`
  } else {
    const minutes = Math.floor(timeDelta / (secondsPerMinute * 1000))
    return `${minutes} phút trước`
  }
}
