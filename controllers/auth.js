import AuthModels from '../models/auth'
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
const tag = tags(['Auth'])
@prefix('/auth')
export default class AuthCtrl {
    /**
     * 测试接口
     * @static
     * @param {*} ctx
     * @memberof AuthCtrl
     */
    @request('GET', '/{code}')
    @summary('测试接口')
    @description('1')
    @path({
        code: {
            type: 'string',
            required: true,
            description: 'wx.login获取的code'
        }
    })
    @tag
    static async code2Session(ctx) {
        const code = ctx.params.code
        const info = await AuthModels._code2Session(code)
        ctx.body = {
            STATUS: 1,
            MESSAGE: '测试成功',
            ITEMS: info
        }
    }
}
