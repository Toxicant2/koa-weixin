import { code2Session } from '../common/weixin'
export default class AuthModels {
    static async _code2Session(code) {
        return await code2Session(code)
    }
}
