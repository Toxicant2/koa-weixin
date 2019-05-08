const router = require('koa-router')()

import UserCtrl from '../controllers/user'

router.get('/test', UserCtrl.getUserTest)

module.exports = router
