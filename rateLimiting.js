const { redisClient} = require("./redisClient")

const max_capacity = 10
const refile_rate = 0.5 

function newToken(token,last_refile){
    const current_time = Date.now()
    const tokens_to_add = (current_time - last_refile)*refile_rate/1000
    return Math.min(max_capacity,token + tokens_to_add)
}

async function checkAccess(ip){
    const data = await redisClient.get(`bucket:${ip}`)
    if (data == null) {
        await redisClient.set(
            `bucket:${ip}`, 
            JSON.stringify({token : 9, last_refile : Date.now()}),
            {EX: 20}
        )
        return true
    }

    const bucket = JSON.parse(data)
    const token = newToken(bucket.token, bucket.last_refile)
    if (token >= 1){
        await redisClient.set(
            `bucket:${ip}`, 
            JSON.stringify({token : token - 1, last_refile : Date.now()}),
            {EX: 20}
        )
        return true
    }

    return false
}

module.exports = {checkAccess};