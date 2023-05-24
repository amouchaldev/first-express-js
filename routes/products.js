const express = require('express')
const router = express.Router()
const {store, getProducts, getProduct, destroy, update} = require('../controllers/products')
const verifyToken = require('../middleware/verifyToken')

router.get('/products', verifyToken, getProducts)
router.get('/products/:id', verifyToken, getProduct)
router.post('/products', verifyToken, store)
router.delete('/products/:id', verifyToken, destroy)
router.put('/products/:id', verifyToken, update)

module.exports = router