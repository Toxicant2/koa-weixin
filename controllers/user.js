import redis from '../config/redis'
import {
    tags,
    query,
    path,
    body,
    formData,
    // middlewares,
    summary,
    description,
    request,
    prefix
} from 'koa-swagger-decorator'
const tag = tags(['User'])
export default class UserCtrl {
    /**
     * 测试接口
     * @static
     * @param {*} ctx
     * @memberof UserCtrl
     */
    @request('GET', '/test')
    @summary('测试接口')
    @description('1')
    @tag
    static async getUserTest(ctx) {
        redis.set('koa-serssion', 'hahaha')
        ctx.body = {
            STATUS: 1,
            MESSAGE: '测试成功',
            ITEMS: null
        }
    }
}
