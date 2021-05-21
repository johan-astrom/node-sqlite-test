const sqlite = require('sqlite3').verbose()

const DBSOURCE = 'books.db'

let db = new sqlite.Database(DBSOURCE, err => {
    if (err){
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE IF NOT EXISTS books(
        bookId INTEGER PRIMARY KEY,
        title TEXT,
        author TEXT,
        isbn TEXT,
        price REAL
        );`, err =>{
            if (err){
                console.error(err.message)
        }else{
            let insertion = 'INSERT INTO books(title, author, isbn, price) VALUES(?,?,?,?)'
                db.run(insertion, ['En herrgårdssägen', 'Selma Lagerlöf', '123-12345667', 1234556])
            }
        })
    }
})

module.exports= db
