import * as yup from 'yup'

// * register && login
export const schema = yup.object({
  fullName: yup
    .string()
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
      'auth:error.full name is invalid'
    )
    .required('auth:error.full name is required')
    .min(2, 'auth:error.full name length')
    .max(60, 'auth:error.full name length'),
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

// * verify
export const verifySchema = yup.object({
  encode: yup
    .string()
    .required('auth:error.verify is required')
    .min(6, 'auth:error.verify length')
    .max(6, 'auth:error.verify length')
})

//* profile
export const profileSchema = yup.object({
  avatar: yup.string().required('Vui lòng thêm ảnh'),
  thumbnail: yup.string().required('Vui lòng thêm ảnh bìa'),
  fullName: yup
    .string()
    .required('Vui lòng thêm tên người dùng')
    .min(2, 'Tên tối thiểu 2 ký tự')
    .max(60, 'Tối đa 60 ký tự')
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
      'Tên không đúng định dạng'
    ),

  description: yup
    .string()
    .required('Vui lòng thêm mô tả')
    .test('hasText', 'Vui lòng thêm mô tả', (value) => {
      const quillText = value?.replace(/<[^>]*>/g, '').trim()
      return quillText !== ''
    })
    .min(3, 'Tối thiểu 3 ký tự')
    .max(500, 'Tối đa 500 ký tự')
})

// profile
export type profileSchemaType = yup.InferType<typeof profileSchema>

// * login && register
const loginSchema = schema.pick(['email', 'password'])
export type loginSchemaType = yup.InferType<typeof loginSchema>
export type registerSchemaType = yup.InferType<typeof schema>

// * verify email
export type verifySchemaType = yup.InferType<typeof verifySchema>

// * forgot password
const forgotPasswordSchema = schema.pick(['email'])
export type forgotPasswordSchemaType = yup.InferType<typeof forgotPasswordSchema>

//* reset password
const resetPasswordSchema = schema.pick(['password', 'passwordConfirm'])
export type resetPasswordSchemaType = yup.InferType<typeof resetPasswordSchema>

// * upload video
export const uploadVideoSchema = yup.object({
  title: yup.string().required('Vui lòng thêm tiêu đề').min(3, 'Tối thiểu 3 ký tự').max(100, 'Tối đa 100 ký tự'),
  description: yup
    .string()
    .required('Vui lòng thêm mô tả')
    .test('hasText', 'Vui lòng thêm mô tả', (value) => {
      const quillText = value?.replace(/<[^>]*>/g, '').trim()
      return quillText !== ''
    })
    .min(3, 'Tối thiểu 3 ký tự')
    .max(500, 'Tối đa 500 ký tự'),
  thumbnail: yup.string().required('Vui lòng thêm ảnh'),
  video: yup.string().required('Vui lòng thêm video')
})

export const playListVideoSchema = yup.object({
  title: yup.string().required('Vui lòng thêm tiêu đề').min(3, 'Tối thiểu 3 ký tự').max(100, 'Tối đa 100 ký tự')
})

export type uploadVideoSchemaType = yup.InferType<typeof uploadVideoSchema>
