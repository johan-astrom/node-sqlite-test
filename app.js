'use strict';

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db.js')
const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(port, () => {
    console.log('Server running on port: %PORT%'.replace('%PORT%', '' + port))
})

app.get('/api/book', (req, res) => {
    console.log('Calling GET api/book')
    let sql = 'SELECT * FROM books'
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error': err.message})
            return
        }
        res.json({
            'message': 'success',
            'myBooks': rows
        })

    })
})

app.get('/api/book/:bookId', (req, res) => {
    let sql = 'SELECT * FROM books WHERE bookId=?'
    let params = req.params.bookId
    db.get(sql, params, (err, rows) => {
        if (err){
            res.status(400).json({'error': err.message})
            return
        }
        res.json({
            'message': 'success',
            'myBooks': rows
        })
    })
})

app.post('/api/book', (req, res) => {
    let errors = []
    if (!req.body.isbn){
        errors.push('No ISBN entered.')
    }
    let data = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        price: req.body.price
    }
    console.log(JSON.stringify(data))
    let sql = 'INSERT INTO books (title, author, isbn, price) VALUES(?,?,?,?)'
    let params = [data.title, data.author, data.isbn, data.price]
    db.run(sql, params, function(err){
        if (err){
            res.status(400).json({'error': err.message})
            return
        }
        res.json({
            'message': 'success',
            'myBooks': data,
            'id': this.lastId
        })
    })
})

app.put('/api/book/:bookId', (req, res) => {
    let data = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        price: req.body.price
    }
    let sql = 'UPDATE books SET title = ?, author = ?, isbn = ?, price = ? WHERE bookId = ?'
    let params = [data.title, data.author, data.isbn, data.price, req.params.bookId]
    db.run(sql, params, function(err){
        if(err){
            res.status(400).json({'error': err.message})
            return
        }
        res.json({
            'message': 'success',
            'myBooks': data,
            'id': this.lastId
        })
    })
})

app.delete('/api/book/:bookId', (req, res) => {
    let sql = 'DELETE FROM books WHERE bookId=?'
    db.run(sql, req.params.bookId, err =>{
        if(err){
            res.status(400).json({'error': err.message})
            return
        }
        res.json({
            'message': 'success',
            rows: this.changed
        })
    })
})

app.get('/', (req, res) => {
    res.json({'message': 'OK'})
})