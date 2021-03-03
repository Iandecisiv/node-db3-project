const db = require ('./scheme-model')


/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme= await db.findById(req.params.id)
    if (scheme) {
      req.scheme = scheme
      next()
    } else {
      res.status(404).json({
        message:'scheme with scheme_id ${scheme.id} is not found',
      })
    }
  } catch (err) {
    next(err)
  }
}
/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if(!req.body.scheme_name) {
    return res.status(400).json({
      message:"invalid scheme_name",
    })
  }
  if(typeof req.body.scheme_name !== "string" || req.body.scheme_name === "") {
    return res.status(400).json({
      message:"invalid scheme_name",
    })
  }
  next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  if(!req.body) {
    return res.status(400).json({
      message:"invalid step",
    })
  }
    if (typeof req.body.instructions !== 
    "string" ) {
      return res.status(400).json({
        message:"invalid step",
      })
    }

    if (typeof req.body.step_number !== "number") {
      return res.status(400).json({
        message:"invalid step",
      })
    }
    if (req.body.budget < 1 ){
      return res.status(400).json({
        message:"invalid step",
      })
    }
    next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
