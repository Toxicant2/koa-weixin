import redis from '../config/redis'

export default class UserCtrl {
    /**
     * 测试接口
     * @static
     * @param {*} ctx
     * @memberof UserCtrl
     */
    static async getUserTest(ctx) {
        redis.set('koa-serssion', Date.now())
        const session = await redis.get('koa-serssion')
        ctx.body = {
            STATUS: 1,
            MESSAGE: '测试成功',
            ITEMS: session
        }
    }
}
