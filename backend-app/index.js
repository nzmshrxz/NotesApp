const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())


let tasks = [{ id: 1, title: 'Learn JavaScript' },
{ id: 2, title: 'Practice Node.js' }
]; //arr to store tasks

//CRUD Operations

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: Date.now(), title };
  tasks.push(newTask);
  res.json({ message: 'Task Created', newTask })
})

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  tasks = tasks.map((task) => {
    return task.id == id ? { ...task, title } : task
  });
  res.json({ message: 'Task Updated', tasks })
})

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  tasks = tasks.filter(task => task.id != id);

  res.json({ message: 'Task deleted', tasks });
});




app.get('/', (req, res) => {
  res.send("API is running...")
})



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})