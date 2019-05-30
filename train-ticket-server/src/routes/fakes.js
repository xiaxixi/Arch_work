import express from 'express';

var router  = express.Router();

/** 
 * Fake search data 
*/
router.post('/search', (req, res) => {
  const { start, end, tstart, tend } = req.body;
  const tickets = [];
  res.status(200).json({
    tickets: []
  });
})


/** 
 * Fake order data
 * type: unpaid \ paid \ all
 * */ 
router.get('/getOrder/:type', (req, res) => {
  const type = req.params.type;
  const orders = [];
  res.status(200).json({
    orders: orders
  });
})



module.exports = router;