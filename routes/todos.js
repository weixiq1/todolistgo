const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req,res) => {
    const todos = await Todo.find({}).lean()
    console.log(todos)
    res.render('index', {
        title: "Главная странпица",
        isIndex: true,
        todos
    })
})

router.get('/create', (req,res) => {
    res.render('create', {
        title: "Добавить дело",
        isCreate: true
    })
})



router.post('/create', async (req, res) => {
    console.log(new Todo)
    const todo = new Todo({title: req.body.title})

    await todo.save()
    res.redirect('/')
})

module.exports = router

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/')
})