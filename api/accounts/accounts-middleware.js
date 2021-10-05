const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { name, budget } = req.body
  if ( name === undefined || budget === undefined) {
    next( { status: 400, message: 'name and budget are required' } )
  } else if ( typeof name !== 'string' ) {
    next( { status: 400, message: 'name of account must be a string' } )
  } else if ( name.trim().length < 3 || name.trim().length > 100 ) {
    next ( { status: 400, message: 'name of account must be between 3 and 100' } )
  } else if ( typeof budget !== 'number') {
    next ( { status: 400, message: 'must be a number' } )
  } else if ( budget < 0 || budget > 1000000 ) {
    next( { status: 400, message: 'budget of account is too large or too small'})
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try { 
    let { name, budget } = req.body
    name = name.trim()
    req.body = { name, budget }
    const foundAccount = await Accounts.findByName(req.body.name)
    if ( foundAccount ) {
      next( { status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  }
  catch( error ) {
    next ( error )
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const foundAccount = await Accounts.getById(req.params.id)
    if ( foundAccount ) {
      req.account = foundAccount
      next()
    } else {
      next( { status: 404, message: 'account not found'})
    }
  }
  catch( error ) {
    next ( error )
  }
}
