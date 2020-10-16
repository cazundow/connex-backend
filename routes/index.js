var express = require('express');
var router = express.Router();
var cors = require('cors');
const app = require('../app');
const basicAuth = require('express-basic-auth')


//maybe include JOI for error handling schema if time permitting.


//authenticate
//TODO: use basic auth middleware
// const auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log(authHeader);
//   if (authHeader != 'testing') return res.status(403).json({ status: 403,message: 'FORBIDDEN'})

//   req.authorizated = true; 
//   next()

// }

// this will will return a 401 when 
router.use(basicAuth({
  users: {
      'caleb': 'yourehired',
      '': 'testing',
  },
  challenge: true,
  unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req, res) {
  return (req.auth ? ('Forbidden') : 'Forbidden. No credentials provided')
}

router.use(cors())


/* GET root. */
router.get('/', function(req, res, next) {
  const date = Date.now(); 
  //return formatted response
  res.json(DateTimeResponse(date))
    
});

//create response object from schema
const DateTimeResponse = (timestamp) => {
  return {
    epoch: {
      properties : {
        description: "The current server time, in epoh seconds, at the time of processing this request", 
        type: "number",
      }
    },
    required: ["epoch"], 
    type: "object", 
    time: timestamp
  }
}

module.exports = router;
