import express from 'express'
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'
const router = express.Router()

const mp4 = async ({ res, input }: any) => {
  const data = await axios({
    method: 'get',
    url: input,
    responseType: 'stream',
  }).then((response) => {
    return response.data
  })

  ffmpeg()
    .input(data)
    .addOutputOption('-movflags', 'frag_keyframe+empty_moov')
    .format('mp4')
    .on('start', function (commandLine) {
      console.log('Spawned Ffmpeg with command: ' + commandLine)
    })
    .on('end', function () {
      console.log('file has been converted successfully')
    })
    .on('error', function (err) {
      console.log('an error happened: ' + err)
    })
    .pipe(res, { end: true })
}

router.get('/:urlEncoded', function (req: any, res: any, _next: any) {
  const url = decodeURIComponent(req.params.urlEncoded)
  console.log('test')
  res.contentType('video/mp4')
  mp4({ res, input: url })
})
export default router
