import fs from 'fs'
import { promises as fsp } from 'fs'
import { spawn } from 'child_process'
import memoize from 'memoizee'

const atob = (a: string): string => Buffer.from(a, 'base64').toString('binary')
// const btoa = (b: string): string => Buffer.from(b).toString('base64')
// console.log(
//   btoa(
//     'http://localhost:5500/The%20Jankiest%20EXTREME%20Gaming%20Setup%20-%20Intel%20%245%2C000%20Extreme%20Tech%20Upgrade-8N5wssPlSdE.temp.mkv',
//   ),
// )

interface Encode {
  input: string
  output: string
  params: Array<string>
}
const ffmpeg = ({ input, output, params }: Encode) => {
  const converter = spawn('ffmpeg', [
    '-y',
    '-hide_banner',
    '-loglevel',
    'error',
    '-i',
    input,
    // 'pipe:0',
    '-threads',
    '1',
    ...params,
    output,
    // 'pipe:1',
  ])
  converter.stderr.on('data', (data) => {
    console.error(`ffmpeg error:\n${data}`)
  })
  return converter
}

export const stream = memoize(
  async (urlEncoded: string, params: Array<string> = [], format: string) => {
    try {
      await fsp.mkdir('temp')
    } catch {}
    const url = atob(urlEncoded)
    const tempPath = `temp/${urlEncoded}.${format}`
    const converter = ffmpeg({ input: url, output: tempPath, params })
    return { tempPath, converter }
  },
)

export default ({ format, transcodeSettings }: any): any => {
  return async (req: any, res: any, _next: any) => {
    const { tempPath, converter } = await stream(
      req.params.urlEncoded,
      ['-f', format, ...transcodeSettings],
      format,
    )
    if (converter.exitCode === 0) {
      res.contentType(`video/${format}`)
      fs.createReadStream(tempPath).pipe(res, { end: true })
    } else {
      res.send({ done: false })
    }
  }
}
