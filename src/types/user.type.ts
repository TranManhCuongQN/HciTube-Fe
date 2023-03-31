export interface User {
  _id: string
  email: string
  fullName: string
  password?: string
  passwordConfirm?: string
  avatar?: string
  createdAt: string
  updatedAt: string
  phone?: string
  dateOfBirth?: string
}
