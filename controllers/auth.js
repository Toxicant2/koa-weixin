import AuthModels from '../models/auth'

export default class AuthCtrl {
    /**
     * 测试接口
     * @static
     * @param {*} ctx
     * @memberof AuthCtrl
     */
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
