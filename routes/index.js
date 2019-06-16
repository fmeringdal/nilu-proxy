var router = require('express').Router();


router.use('/lookup', require('./lookup'));  


//Send 404 for unmatched routes
router.use((req, res) => {
    res.send(404);
});

module.exports = router;