import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

const port = 1111;

const app = express();
app.use(cors())
app.use(express.json())

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test"
});


app.get('/', (req, res) => {
    res.send('<h1>OADS</h1>')
})

app.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee"
    database.query(sql, (error, data) => {
        if (error) return res.json(error)
        return res.json(data)
    })
})

app.delete('/employee', (req, res)=>{
    const sql = "DELETE FROM employee WHERE id = ?"
    database.query(sql, req.body.id, (error, data)=>{
        if(error) return res.json(error)
            return res.json(data)
    })
})

app.put('/employee', (req, res)=>{
    const sql = "UPDATE employee SET name = ?, designation = ?, age = ?, salary = ?, experience = ?, gender = ? WHERE id = ?"
    const values = [
        req.body.name,
        req.body.designation,
        req.body.age,
        req.body.salary,
        req.body.experience,
        req.body.gender,
        req.body.id
    ]

    database.query(sql, [...values], (error, data)=>{
        if(error) return res.json(error)
            return res.json(data)
    })
})

app.post('/employee', (req, res)=>{
    const sql = "INSERT INTO employee (name, designation, age, salary, experience, gender) VALUES (?, ?, ?, ?, ?, ?)"
    const values = [
        req.body.name,
        req.body.designation,
        req.body.age,
        req.body.salary,
        req.body.experience,
        req.body.gender
    ]

    database.query(sql, [...values], (error, data)=>{
        if(error) return res.json(error)
            return res.json(data)
    })
})

app.listen(port, () => {
    console.log(`Server is fucking on ${port}, mackichu`)
})













































