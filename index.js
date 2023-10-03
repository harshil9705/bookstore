const express = require('express')
const { db } = require('./db')
const { data } = require('./book')
const { middleware } = require('./auth.middleware')
const app = express()
app.use(express.json())


// get

app.get('/',(req,res)=>{
    res.send('welcome to the book store')
})

app.get('/books/book/:id',async(req,res)=>{
    const {id} = req.params
    // console.log('234');
    const getdata = await data.findById(id)
    if(getdata){
        res.status(200).send(getdata)
    }
    else{

        res.status(404).send("error")
    }
})

app.get('/books',async(req,res)=>{
    const getall = await data.find()
    res.send(getall)
})

// delete

app.delete('/books/delete/:id',async(req,res)=>{
    const {id} = req.params
    const dlt = await data.findByIdAndDelete(id)
    const nondelete = await data.find(req.body)

    res.send(nondelete)
})

// post

app.post('/books/addbooks',middleware,async(req,res)=>{
    const postdata = await data.create(req.body)
    res.send(postdata)
})

// patch

app.patch('/books/update/:id',async(req,res)=>{
    const {id} = req.params

    const update = await data.findOneAndUpdate({_id : id},{$set : req.body})
    res.send(update)
})

// filters

app.get('/books/filter',async(req,res)=>{
    const {author,category,sort} = req.query
    if(sort == "lth"){
        const filter = await data.find().sort({price : 1})
        res.send(filter)
    }
    else if(sort == 'htl'){
        const filter = await data.find().sort({price : -1})
        res.send(filter)
    }
    else if(author){
        const filter = await data.find({author : author})
        res.send(filter)
    }
    else if(category){
        const filter = await data.find({category : category})
        res.send(filter)
    }
    
})

// app.get('/books/filter',async(req,res)=>{
//     const {author} = req.query

// })


app.listen(8090,()=>{
    console.log('8090');
    db()
})