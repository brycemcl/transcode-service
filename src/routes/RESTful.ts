import express from 'express'
const router = express.Router()

//get one of resource
router.get('/:id', async (req: any, res: any, _next: any) => {})
//get all of resource
router.get('/', async (req: any, res: any, _next: any) => {})
//create new instance of resource
router.post('/', async (req: any, res: any, _next: any) => {})
//update one of resource
router.put('/:id', async (req: any, res: any, _next: any) => {})
//delete one of resource
router.delete('/:id', async (req: any, res: any, _next: any) => {})

export default router
