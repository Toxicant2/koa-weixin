import https from 'https'
import config from '../config/index'

function httpsRequest(URL) {
    return new Promise((resolve, reject) => {
        const req = https.request(config.WxHost + URL, res => {
            res.setEncoding('utf8')
            res
                .on('data', d => {
                    resolve(JSON.parse(d))
                })
                .on('end', () => {
                    // console.log('响应中已无数据。')
                })
        })
        req.on('error', e => {
            reject(e)
            console.error('https error:', e.message)
        })
        req.end()
    })
}
module.exports = {
    // 登录凭证校验。通过 wx.login() 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程
    code2Session(code) {
        const URL = `sns/jscode2session?appid=${config.AppId}&secret=${
            config.AppSecret
        }&js_code=${code}&grant_type=authorization_code`

        return httpsRequest(URL)
    },

    getAccessToken() {
        const URL = `cgi-bin/token?grant_type=client_credential&appid=${
            config.AppId
        }&secret=${config.AppSecret}`

        return httpsRequest(URL)
    }
}
