const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

MongoClient.connect('mongodb+srv://JamesSchoe:Riv3rsRo4ds!@cluster0.xozo2dk.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('zell-wk-project')
        const quotesCollection = db.collection('quotes')
        app.set('view engine', 'ejs')
            app.use(bodyParser.urlencoded({ extended: true 
                }))
            app.get('/', (req, res) => {
                db.collection('quotes').find().toArray()
                    .then(results => {
                        res.render('index.ejs', { quotes: results })
                    })
                    .catch(error =>
                        console.error(error))

                    })
            app.post('/quotes', (req, res) => {
                quotesCollection.insertOne(req.body)
                    .then(result => {
                        res.redirect('/');
                      })
                    .catch(error => console.error(error))
                  })
            app.listen(3000, function() {
                console.log("Node is working");
                })
            })
    .catch(error => console.log(error));