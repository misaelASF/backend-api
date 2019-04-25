const router = require('express').Router();
const user = require('./Controllers/UserController');
const revenue = require('./Controllers/RevenueController');
const authMiddleware = require('./Middlewares/auth');


router.post('/register', user.store);
router.post('/authenticate', user.authenticate);

router.get('/list', revenue.index);
router.get('/list/:id', revenue.show);

router.use(authMiddleware);

router.post('/create', revenue.store);
router.delete('/delete/:id', revenue.destroy);

module.exports = router;