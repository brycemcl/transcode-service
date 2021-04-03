import express from 'express'
import axios from 'axios'
import ffmpeg from '../ffmpeg'
const router = express.Router()

const axiosStream = (input: string) => {
  return axios({
    method: 'get',
    url: input,
    responseType: 'stream',
  }).then((response) => {
    return response.data
  })
}

router.get('/:urlEncoded', async (req: any, res: any, _next: any) => {
  const url = decodeURIComponent(req.params.urlEncoded)
  res.contentType('video/mp4')
  const input = await axiosStream(url)
  const converter = ffmpeg([
    '-f',
    'mp4',
    '-movflags',
    'frag_keyframe+empty_moov',
  ])
  input.pipe(converter.stdin)
  const output = converter.stdout
  output.pipe(res, { end: true })
  res.on('finish', () => {
    converter.kill('SIGKILL')
  })
})
export default router
