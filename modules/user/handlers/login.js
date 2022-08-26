import jwt from 'jsonwebtoken'
import { encryptString } from '../../../utils/security.js'
const handler = async function (request, reply) {
  try {
    const { email, password } = request.body
    if (!email) throw new Error('systemError: email is required!')
    const userData = await this.dbConnection('user').where('email' ,'=', email).first()
    if (!userData || !Object.keys(userData).length) {
      return reply.code(404).send('User not found.')
    }

    const salt = process.env.PASSWORD_SALT
    if (!salt) throw new Error('systemerror: Salt is required!')
    const encryptedPassword = encryptString(password, salt)
    if (encryptedPassword !== userData.password) {
      return reply.code(401).send('Invalid credentials.')
    }
    
    const tokenPayload = {
      userId: userData.id
    }
    const tokenSecret = process.env.JWT_SECRET
    const generatedToken = jwt.sign(tokenPayload, tokenSecret, {
      expiresIn: parseInt(process.env.JWT_EXPIRATION)
    })
    reply.send(generatedToken)
  } catch (error) {
    throw error
  }
}

export default handler
