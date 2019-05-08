import clientRedis from '../config/redis'

export default class UserCtrl {
    /**
     * 测试接口
     * @static
     * @param {*} ctx
     * @memberof UserCtrl
     */
    static async getUserTest(ctx) {
        clientRedis.set('koa-session', Date.now())
        const session = await clientRedis.get('koa-session')
        ctx.body = {
            STATUS: 1,
            MESSAGE: '测试成功',
            ITEMS: session
        }
    }
}
