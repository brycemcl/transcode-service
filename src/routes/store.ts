import express from 'express'
const router = express.Router()
import { v4 as uuidv4 } from 'uuid'
import { s3Client, bucketName } from '../s3Client'
const expiry = 7 * 24 * 60 * 60
router.use(async (req: any, res: any, next: any) => {
  req.user = 'testuser'
  next()
})
interface CreateChunk {
  user: string
  uuid: string
  chunk: number
}
const createChunk = async ({ user, uuid, chunk }: CreateChunk) => {
  return await s3Client
    .presignedPutObject(bucketName, `${user}/${uuid}/chunks/${chunk}`, expiry)
    .then((result: any) => result)
    .catch((err: any) => {
      console.error(err)
      return null
    })
}
interface CreateUpload {
  user: string
  uuid: string
}
const createUpload = async ({ user, uuid }: CreateUpload) => {
  return await s3Client
    .presignedPutObject(bucketName, `${user}/${uuid}/metadata`, expiry)
    .then((result: any) => result)
    .catch((err: any) => {
      console.error(err)
      return null
    })
}

//get one of resource
router.get('/:uuid', async (req: any, res: any, _next: any) => {
  const uuid = req.params.uuid
  const user = req.user
  // const stream = s3Client.listObjectsV2(bucketName, `${user}/${uuid}`, true)
  // stream.on('data', function (obj) {
  //   console.log(obj)
  // })
  // stream.on('error', function (err) {
  //   console.log(err)
  // })
  const url = await s3Client
    .presignedGetObject(bucketName, `${user}/${uuid}/metadata`, expiry)
    .then((result: any) => result)
    .catch((err: any) => {
      console.error(err)
      return null
    })
  res.send({ metadata: url })
})
//get all of resource
router.get('/', async (req: any, res: any, _next: any) => {
  const user = req.user
})
//create new instance of resource
router.post('/', async (req: any, res: any, _next: any) => {
  const uuid = uuidv4()
  const user = req.user
  const url = await createUpload({ user, uuid })
  const chunkURL = await createChunk({ user, uuid, chunk: 0 })

  res.send({ url, uuid, chunk: { url: chunkURL, index: 0 } })
})
//update one of resource
router.put('/:uuid/:chunk', async (req: any, res: any, _next: any) => {
  const uuid = req.params.uuid
  const user = req.user
  const chunk = req.params.chunk

  const chunkURL = await createChunk({ user, uuid, chunk })
  const url = await createUpload({ user, uuid })

  res.send({ url, uuid, chunk: { url: chunkURL, index: chunk } })
})
//delete one of resource
router.delete('/:id', async (req: any, res: any, _next: any) => {})

export default router
