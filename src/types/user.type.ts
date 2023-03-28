export interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  password?: string
  passwordConfirm?: string
  avatar?: string
  createdAt: string
  updatedAt: string
  phone?: string
  dateOfBirth?: string
}
