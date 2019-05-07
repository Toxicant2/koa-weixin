const REDIS = require('redis')
const client = REDIS.createClient({
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
const redis = {
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

    set(key, val, duration = 60 * 60 * 12) {
        client.set(key, val)
        client.expire(key, duration) // 秒
    },

    del(key) {
        client.del(key)
    }

    // quit() {
    //     client.quit()
    // }
}
export default redis
