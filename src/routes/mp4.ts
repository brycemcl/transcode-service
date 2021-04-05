import express from 'express'
const router = express.Router()
import ffmpeg from '../ffmpeg'

const transcodeSettings = [
  '-f',
  'mp4',
  '-c:v',
  'copy',
  '-c:a',
  'copy',
  // '-movflags',
  // 'frag_keyframe+empty_moov',
]

router.get('/:urlEncoded', ffmpeg({ format: 'mp4', transcodeSettings }))

export default router
