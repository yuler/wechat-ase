import { randomBytes, createDecipheriv, createCipheriv } from 'crypto';

const randomStringLength16 = () => {
  return randomBytes(8).toString('hex');
};

const pcks7Encode = (buf: Buffer) => {
  const padLen = 32 - (buf.length % 32) || 32;
  const padBuf = Buffer.alloc(buf.length + padLen).fill(padLen);
  buf.copy(padBuf);
  return padBuf;
};

const pcks7Decode = (buf: Buffer) => {
  let padLen = buf[buf.length - 1];
  if (padLen < 1 || padLen > 32) {
    padLen = 0;
  }
  return buf.slice(0, buf.length - padLen);
};

// Todo add validate msgSignature

export const encode = (text: string, encodingAESKey: string) => {
  const AESKey = Buffer.from(encodingAESKey + '=', 'base64');
  const IV = AESKey.slice(0, 16);
  const cipher = createCipheriv('aes-256-cbc', AESKey, IV);
  cipher.setAutoPadding(false);
  const textBuffer = Buffer.from(text);
  const data = Buffer.concat([
    Buffer.from(randomStringLength16()),
    Buffer.from(textBuffer.length.toString(16).padStart(8, '0'), 'hex'),
    textBuffer,
  ]);
  return Buffer.concat([
    cipher.update(pcks7Encode(data)),
    cipher.final(),
  ]).toString('base64');
};

export const decode = (text: string, encodingAESKey: string) => {
  const AESKey = Buffer.from(encodingAESKey + '=', 'base64');
  const IV = AESKey.slice(0, 16);
  const decipher = createDecipheriv('aes-256-cbc', AESKey, IV);
  decipher.setAutoPadding(false);
  const decipheredBuff = pcks7Decode(
    Buffer.concat([decipher.update(text, 'base64'), decipher.final()])
  );
  const messageLenngth = decipheredBuff
    .slice(16)
    .slice(0, 4)
    .readUInt32BE(0);
  const content = decipheredBuff.slice(20, messageLenngth + 20);
  return content.toString();
};
