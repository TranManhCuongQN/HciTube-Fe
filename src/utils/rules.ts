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

// * upload
const notEmptyArray = (array: any) => {
  return array && array.length > 0
}
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
  video: yup.string().required('Vui lòng thêm video'),
  category: yup
    .array()
    .test('notEmpty', 'Vui lòng thêm thể loại video bạn muốn', notEmptyArray)
    .required('Vui lòng thêm thể loại video bạn muốn')
})

// * playList
export const playListVideoSchema = yup.object({
  title: yup.string().required('Vui lòng thêm tiêu đề').min(3, 'Tối thiểu 3 ký tự').max(100, 'Tối đa 100 ký tự')
})

// * changePassword
export const changePasswordSchema = yup.object({
  passwordCurrent: yup
    .string()
    .required('Vui lòng nhập mật khẩu hiện tại')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .max(60, 'Mật khẩu tối đa 60 ký tự')
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Bắt buộc phải có chữ hoa, chữ thường, ký tự đặc biệt, số'
    }),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu hiện tại')
    .min(6, 'Mật khẩu tối thiểu 6 ký tự')
    .max(60, 'Mật khẩu tối đa 60 ký tự')
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Bắt buộc phải có chữ hoa, chữ thường, ký tự đặc biệt, số'
    }),
  passwordConfirm: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu ')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
})

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

//* profile
export type profileSchemaType = yup.InferType<typeof profileSchema>

export type uploadVideoSchemaType = yup.InferType<typeof uploadVideoSchema>

//* changePassword
export type changePasswordSchemaType = yup.InferType<typeof changePasswordSchema>
