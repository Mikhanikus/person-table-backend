const {poolInstance} = require("./postgres_cridential");

module.exports.db = function db(value) {
    return new Promise((resolve) => {
        resolve(poolInstance
            .query(value).then((res) => res.rows))
    })

}