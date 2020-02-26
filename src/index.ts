// import { createDecipheriv, createCipheriv } from 'crypto'
import { createDecipheriv } from 'crypto'

const pcks7_decode = (buf: Buffer) => {
  let padLen = buf[buf.length - 1]
  if (padLen < 1 || padLen > 32) {
    padLen = 0
  }
  return buf.slice(0, buf.length - padLen)
}

export const decode = (text: string, encodingAESKey: string) => {
  const AESKey = Buffer.from(encodingAESKey + '=', 'base64')
  const IV = AESKey.slice(0, 16)
  const decipher = createDecipheriv('aes-256-cbc', AESKey, IV)
  decipher.setAutoPadding(false)
  const decipheredBuff = pcks7_decode(
    Buffer.concat([
      decipher.update(text, 'base64'),
      decipher.final()
    ])
  )
  const messageLenngth = decipheredBuff.slice(16).slice(0, 4).readUInt32BE(0)
  const content = decipheredBuff.slice(20, messageLenngth + 20)
  return content.toString()
}