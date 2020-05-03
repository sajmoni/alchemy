import * as yup from 'yup'

export const schema = yup
  .object({
    name: yup.string().max(20).required(),
    price: yup.number().integer().positive().required(),
  })
  .noUnknown(true)

const Item = Object.freeze({
  'Some data': {
    name: 'Some data',
    price: 100,
  },
})

export default Item
