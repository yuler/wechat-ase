import { decode } from '../src';

describe('decode', () => {
  it('works', () => {
    // const _token = 'shttest'
    const encodingAESKey = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG'
    const encrypt = 'podI1mIDNVcCql4GYcKZrM0V/KB3Y7s3k4zQCT9Apqc/IXAWxiT03mlKDSviIdp37Edlmo1QGxsIuHOiE2Pxxay2IUx/rexBTv0R6FRYI23GCbAKWnCN2p0qE+UBoHSiLSJ/Rjedk0QOfAVmC+nSCV8vqWJ7EHvL+XaX840hRNktnqe+/yp4U+F0FUHXVmNJeJq3N5ynci+1CnoKc+c6yd8hh+924cQjUHRdVnk7+DTQ/u7hyW+5SKFakBfcci47UJ1DMPmkHDE3rGcl+3pO9QCZZrcsph71EUUXxOR0lHM='

    expect(decode(encrypt, encodingAESKey)).toEqual(2)
  });
});
