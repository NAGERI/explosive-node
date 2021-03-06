const modelProduct = require('../models/product')

const getAllProductsStatic = async (req,res) => {
  const product = await modelProduct.find({ })
  //.sort('-name price')
  .select('name price') // Explain this in the API docs
  .limit() // number of documents to return
  .skip() // Number of documents returned (sets pagination)
  res.status(200).json({product})
}

/**All this filtering can be got from the mongoose docs */
const getAllProducts = async (req,res) => {
  const {featured
        ,company
        ,name
        ,sort
        ,fields
        ,numericFilters // showcase these variables in the API docs
        } = req.query
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
  if(numericFilters){
    const operatorMap = {
      /*From the user friendly to the ones understood by mongoose*/
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'$lt',
      '<=':'$lte',
    }  
    const regEx = /\b(<|>|=|<=|>=)\b/g
    let filters = numericFilters.replace(
      regEx, 
      (match) => `-${operatorMap[match]}-` 
    )
    const options = ['price','rating']
    filters = filters.split(',').forEach( item => {
      /**Destructure the array price-$gt-30 */
      const [field,operator,value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    });
  }
  console.log(queryObject) /* for debugging */
  let result =  modelProduct.find(queryObject)
  /**
   * Adding SORT functionality
   */
  if (sort){ // If it has a value!
    // remove the commma that user puts.
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }else{
    result = result.sort('createdAt')
  }
  if (fields){ // If it has a value!
    // remove the commma that frontend puts.  
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  } 
  const page = Number(req.query.page)  || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit) 
  const products = await result 
  res.status(200).json({products, nbHits: products.length})
}

module.exports = {
   getAllProducts
  ,getAllProductsStatic
}