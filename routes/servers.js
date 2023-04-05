import {Router} from 'express'
import {getDB, addToDB,deleteRow,getRowData,updateRowData,fetchUser,regUser} from '../mysql/mysql.cjs'


const router = Router()

router.get('/api/db', getDB)
router.post('/api/db/', getRowData)
router.post('/api/db/add',addToDB)
router.post('/api/db/deleteRow',deleteRow)
router.post('/api/db/update',updateRowData)
router.post('/api/db/fetchuser', fetchUser)
router.post('/api/db/reguser',regUser)

export default router