import crypto from 'crypto'

const encryptString = (string, salt) => {
  if (!string || !salt) {
    return string
  }

  return crypto
  .pbkdf2Sync(string.toString(), salt, 10, 64, 'sha512')
  .toString('hex')
}
export {
  encryptString
}
