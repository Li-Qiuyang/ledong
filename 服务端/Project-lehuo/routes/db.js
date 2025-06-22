const mysql = require("mysql")
let pool = mysql.createPool({
    host: '192.168.50.1',
    user: 'root',
    password: '123456',
    database: 'lehuo-database'
})
module.exports = {
    query: (sql, args) => {
        let p = new Promise((resolve, reject) => {
            pool.query(sql, [...args], (err, results, fields) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
        return p
    }
}