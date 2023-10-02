const express =require('express')
const cors =require('cors')
const app=express();
add.use(cors())
app.use(express.json())
const errorMiddleware =require('./middlewares/error')
const auth = require('./routes/auth')
const tasks = require('./routes/tasks')
app.use('/api/v1/',auth)
app.use('/api/v1/tasks', tasks);
app.use(errorMiddleware)

module.exports =app;