const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const strftime = require('strftime')
const app = express()
const PORT = 3001

//app.set('views',pathname)
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let tasks = [
    {
        id: 1,
        title: 'Test Task1',
        done: false,
        creationDate: +(new Date())
    },
    {
        id: 2,
        title: 'Test Task2',
        done: false,
        creationDate: +(new Date())
    },
    {
        id: 3,
        title: 'Test Task3',
        done: false,
        creationDate: +(new Date())
    }
]

let idCounter = 3;

app.get('/', (req, res) => {
    res.render('pages/index', { tasks }
        )
})

//CREATE New Task
app.post('/tasks', (req, res) => {
    const title = req.body.task
    const newTaskObject = {
            id: ++idCounter,
            title: title,
            done: false,
            creationDate: +(new Date())
        }
        /*/+(new Date()) guarda en formato Timestamp (segundos desde el 1º de Enero de 1970), 
        es el mejor formato para guardar fechas, luego al mostrarla se podrá convertir a texto.*/
    tasks.push(newTaskObject)
    res.redirect('/')
})

//DELETE a Task permanently
app.delete('/task/:id', (req, res) => {
    const id = +req.params.id
    let tempTasks = tasks.filter( task => task.id !== id)
    tasks = tempTasks
    res.send(`Element with id ${id} has been DELETED!`)
})

//UPDATE - Mark as DONE / UNDONE!
app.put('/task/:id', (req, res) => {
    console.log('Task ID to mark as Done: ' + req.params.id)
    const id = +req.params.id
    //const done = req.body.done === 'true' ? true : false
    let newDoneStatus = false;
    let tempTasks = tasks.map( task => {
        if (task.id === id){
            if(task.done === false){
                task.done=true
                newDoneStatus=true
            }
            else{
                task.done=false
                newDoneStatus=false
            }
        }
        return task
    })
    tasks = tempTasks
    res.send(newDoneStatus)
})

app.put('/taskText/:id' , (req,res) =>{
    console.log('Task ID to Update Text: ' + req.params.id)
    const id = +req.params.id
    let newTaskText = req.body.title
    let tempTasks = tasks.map( task => {
        if (task.id === id) task.title = newTaskText
        return task
        })
    res.send(`Text of element id ${id} has been updated with: ${newTaskText}`)
})




app.listen(PORT)
console.log('Listening at port: ' + PORT)