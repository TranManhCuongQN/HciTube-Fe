import * as i18n from 'i18next'
import * as yup from 'yup'

export const schema = yup.object({
  firstName: yup
    .string()
    // eslint-disable-next-line no-useless-escape
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, 'Please enter valid name')
    .min(2, 'Độ dài từ 2 - 160 ký tự')
    .max(160, 'Độ dài từ 2 - 160 ký tự'),
  lastName: yup
    .string()
    // eslint-disable-next-line no-useless-escape
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, 'Please enter valid name')
    .min(2, 'Độ dài từ 2 - 160 ký tự')
    .max(160, 'Độ dài từ 2 - 160 ký tự'),
  email: yup
    .string()
    .email(i18n.t('auth:error.email is invalid'))
    .required(i18n.t('auth:error.email required'))
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .trim(),
  password: yup
    .string()
    .required(i18n.t('auth:error.password is required'))
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Bắt buộc phải có chữ hoa, chữ thường, ký tự đặc biệt, số'
    }),
  retypePassword: yup
    .string()
    .required('Retype password là bắt buộc')
    .oneOf([yup.ref('password')], 'Password không khớp')
})

const loginSchema = schema.pick(['email', 'password'])
export type loginSchemaType = yup.InferType<typeof loginSchema>
