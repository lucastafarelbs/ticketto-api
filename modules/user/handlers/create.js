import { encryptString } from '../../../utils/security.js'
const handler = async function (request, reply) {
  try {
    const { 
      email, 
      password, 
      name, 
      mainPhoneNumber, 
      document
    } = request.body

    const salt = process.env.PASSWORD_SALT
    if (!salt) throw new Error('systemerror: Salt is required!')
    const encryptedPassword = encryptString(password, salt)

    await this
      .dbConnection('user')
      .insert( { 
        email, 
        password: encryptedPassword, 
        name, 
        main_phone_number: mainPhoneNumber, 
        document
      })
  } catch (error) {
    console.log(error)
    reply.code(500).send('can\'t create.')
  }
}

export default handler
