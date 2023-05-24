const Product = require('../Models/Product')

async function store(req, res) {
    try {
        const product = new Product(req.body)
        await product.save()
        return res.json(product)
    }
    catch (err) {
        console.log(err.message)
    }
}

const getProducts = async(req, res) => {
    try {
        const products = await Product.find()
        return res.send(products)
    }
    catch (err) {
        console.log(err.message)
    }
}

const getProduct = async (req, res) => {
    const {id} = req.params
    // return res.json({_id: productId})
    const product = await Product.findById(id)
    return res.json(product)
}

const destroy = (req, res) => {
    Product.deleteOne({_id: req.params.id})
    .then(() => {
        res.json({message: "product deleted successfully"})
    })
    .catch(err => {
        return res.status(500).json({error: err})
    })
}
const update = async (req, res) => {
    const {name, price} = req.body
    const {id} = req.params
    const product = await Product.updateOne({_id: id}, {name, price})
    return res.json(product)
}
module.exports = {store, getProducts, getProduct, destroy, update}