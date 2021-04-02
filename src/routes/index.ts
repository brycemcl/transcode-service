import express from 'express'
const router = express.Router()

router.get('/', function (_req: any, res: any, _next: any) {
  res.send({ title: 'Express' })
})

export default router
