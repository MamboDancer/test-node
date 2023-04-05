var sql = require('mysql')

var conn
var dbname= 'MAIN'

const usertablename = 'users'
conn = sql.createConnection(
{
    host: 'db4free.net',
    user: 'mambodancer',
    password: 'griff123',
    database: 'mambodancer'
})
conn.connect((err) => {
    if(err) console.log(err)
    else {
        console.log(`Connected to db`) 

    }
})



/*

*/

getDB = (req,res) =>
{
    conn.query(`SELECT * from ${dbname}`, (err,ress,f) => {
        if(err) console.log('No Connection to db')
        else return res.status(200).json(ress)
    })
}

 addToDB = (req,res) =>
{
    let name = req.body.name === '' ? 'None' : req.body.name
    let descr = req.body.desrc === '' ? 'None' : req.body.descr
    let quanity = req.body.quanity
    let price = req.body.price
    conn.query("INSERT INTO "+dbname+" (name,descr,quanity,price) VALUES ('"+name+"','"+descr+"',"+quanity+","+price+")", (err,ress,f) => {
        if(err) console.log(err)
        else return res.status(201).json(ress)
    })
    
}

deleteRow = (req,res) =>
{
    conn.query("DELETE FROM "+dbname+" WHERE id = "+req.body.id+"", (err,ress,f) => { 
        if(err) console.log(err)
        else return res.status(200).json(ress)
    })
}

getRowData = (req,res) =>
{
    conn.query("SELECT * from "+dbname+" WHERE id = "+req.body.id+"", (err,ress,f) => {
        if(err) console.log(err)
        else return res.status(200).json(ress)
    })
}

updateRowData = (req, res) =>
{
    let name = req.body.ename === '' ? 'None' : req.body.ename
    let descr = req.body.edescr === '' ? 'None' : req.body.edescr
    let quanity = req.body.equanity
    let price = req.body.eprice
    conn.query("UPDATE "+dbname+" SET name = '"+name+"',descr = '"+descr+"',quanity = '"+quanity+"',price = '"+price+"' WHERE id = "+req.body.eid+"", (err,ress,f) => {
        if(err) console.log(err)
        else return res.status(200).json(ress)
    })
}


/* USER TABLE */
fetchUser = (req,res) =>
{
    conn.query(`SELECT login, role from ${usertablename} WHERE (login = "${req.body.user}" AND password= "${req.body.pass}")`, (err,result,f) =>
    {
        if(err) return res.json(-1)
        else if (result.length === 0) res.json([{role: 'nouser'}])
        else return res.json(result)
    })
}

regUser = (req,res) =>
{
    let user = req.body.user
    let pass = req.body.pass
    let role = 'commonuser'
    if(user.includes('dancer')) role = 'admin'
    conn.query("INSERT INTO users (login,password,role) VALUES ('"+user+"','"+pass+"','"+role+"')", (err,ress,f) => {
        if(err) console.log(err)
        else return res.status(201).json(ress)
    })
}

/* USER T
/* USER TABLE */






exports.conn = conn
exports.getDB = getDB
exports.addToDB = addToDB
exports.regUser = regUser
exports.fetchUser = fetchUser
exports.deleteRow = deleteRow
exports.getRowData = getRowData
exports.updateRowData = updateRowData


