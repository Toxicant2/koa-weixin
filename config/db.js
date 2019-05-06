const Sequelize = require('sequelize')
const theDb = new Sequelize('mysql://toxicant:192920@47.94.87.82/koa-weixin',{
    define:{
        timestamps:false
    }
})
module.exports = {
    theDb
}