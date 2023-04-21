const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Back it up! Back it up! You have the wrong route!'));

module.exports = router;
