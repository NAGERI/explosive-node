const modelProduct = require('../models/product')

const getAllProductsStatic = async (req,res) => {
  const product = await modelProduct.find({
    name: 'ikea'
  })
  res.status(200).json({msg: 'Products testing route'})
}


const getAllProducts = async (req,res) => {
  const {featured,company, name,sort} = req.query
  const queryObject = {}
  /*Better approach is setting up an object*/
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false; 
  }
  if (company) {
    // incase company exists.
    queryObject.company = company;
  }
  if (name) {
  // Query operators in mongodb docs
    queryObject.name = { $regex: name, $pattern: 'i'};
  }
  console.log(queryObject)
  const products = await modelProduct.find(queryObject)
  res.status(200).json({products, nbHits: products.length})
}

module.exports = {
   getAllProducts
  ,getAllProductsStatic
}