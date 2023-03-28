import * as yup from 'yup'

export const schema = yup.object({
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, 'auth:error.first name is invalid')
    .required('auth:error.first name is required')
    .min(2, 'auth:error.first name length')
    .max(60, 'auth:error.first name length'),
  lastName: yup
    .string()
    .required('auth:error.last name is required')
    .matches(/^[A-Za-z ]*$/, 'auth:error.last name is invalid')
    .min(2, 'auth:error.last name length')
    .max(60, 'auth:error.last name length'),
  email: yup
    .string()
    .email('auth:error.email is invalid')
    .required('auth:error.email required')
    .min(6, 'auth:error.email length')
    .max(60, 'auth:error.email length')
    .trim(),
  password: yup
    .string()
    .required('auth:error.password is required')
    .min(6, 'auth:error.password length')
    .max(60, 'auth:error.password length')
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'auth:error.password'
    }),
  passwordConfirm: yup
    .string()
    .required('auth:error.retype password is required')
    .oneOf([yup.ref('password')], 'auth:error.passwords do not match')
})

const loginSchema = schema.pick(['email', 'password'])
export type loginSchemaType = yup.InferType<typeof loginSchema>
export type registerSchemaType = yup.InferType<typeof schema>
