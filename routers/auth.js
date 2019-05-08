const router = require('koa-router')()

router.prefix('/auth')

import AuthCtrl from '../controllers/auth'

// 获取session
router.get('/:code', AuthCtrl.code2Session)

module.exports = router
