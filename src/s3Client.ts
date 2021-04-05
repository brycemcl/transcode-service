const Minio = require('minio')
export const bucketName = 'mybucket'

export const s3Client = new Minio.Client({
  endPoint: '192.168.68.100',
  port: 9000,
  accessKey: 'AKIAIOSFODNN7EXAMPLE',
  secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
  useSSL: false,
})
export const s3Setup = async () => {
  await s3Client
    .makeBucket(bucketName)
    .then((result: any) => {
      console.log('bucket setup')
      return result
    })
    .catch((err: any) => {
      console.log(err.code)
      return null
    })
}
