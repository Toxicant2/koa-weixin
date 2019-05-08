const config = require('./index')
const redis = require('redis')
const client = redis.createClient({
    retry_strategy(options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection')
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted')
        }
        if (options.attempt > 10) {
            return undefined
        }
        return Math.min(options.attempt * 100, 3000)
    }
})
// redis auth
client.auth(config.RedisPasswd)

const clientRedis = {
    get(key) {
        return new Promise((resolve, reject) => {
            client.get(key, function(err, reply) {
                if (err) {
                    reject(err)
                }
                resolve(reply ? reply.toString() : reply)
            })
        })
    },

    set(key, val, duration) {
        client.set(key, val)
        if (duration) client.expire(key, duration)
    },

    del(key) {
        client.del(key)
    }

    // quit() {
    //     client.quit()
    // }
}
export default clientRedis
