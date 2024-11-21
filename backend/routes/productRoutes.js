import express from 'express'
import { addUsers, addProducts, getUser, registerUser, getUserProfile, updateUser, getProducts, getProduct, createOrders, updateOrder, getAllOrders, getOneOrder } from '../controllers/userControllers.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/users', addUsers)
router.post('/products', addProducts)
router.post('/users/login', getUser)
router.post('/register', registerUser)
router.get('/profile',protect, getUserProfile)
router.put('/profile', protect, updateUser)
router.get('/products', getProducts)
router.get('/products/:id',getProduct)
router.post('/users/order', protect, createOrders)
router.put('/orders/:id', protect, updateOrder)
router.get('/orders', protect, getAllOrders)
router.get('/order/:id', protect, getOneOrder)

export default router