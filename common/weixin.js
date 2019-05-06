import https from 'https'
import config from '../config/index'
module.exports = {
    // 登录凭证校验。通过 wx.login() 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程
    code2Session(code) {
        return new Promise((resolve, reject) => {
            const URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${
                config.APPID
            }&secret=${
                config.SECRET
            }&js_code=${code}&grant_type=authorization_code`
            const req = https.get(URL, res => {
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
}
