import { spawn } from 'child_process'
const ffmpeg = (params: Array<string>) => {
  const converter = spawn('ffmpeg', [
    '-y',
    '-hide_banner',
    '-loglevel',
    'error',
    '-i',
    'pipe:0',
    ...params,
    'pipe:1',
  ])
  converter.stderr.on('data', (data) => {
    console.error(`ffmpeg error:\n${data}`)
  })
  return converter
}
export default ffmpeg
