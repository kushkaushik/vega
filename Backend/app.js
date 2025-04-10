const express = require('express');
const { userRoute, blogRoute } = require('./utils/routerPath');
const cors = require('cors')
const dbConnection = require('./database/db');
require('dotenv').config();
const app = express();
dbConnection()

const PORT = process.env.PORT || 8080;
app.use(cors({
    origin: '*',        
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],  // Optional: define allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Optional: allowed headers
    exposedHeaders: ['authorization']
  }));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(userRoute, require('./src/user/router/index'))
app.use(blogRoute, require('./src/blog/router/index'))

app.use(require('./middleware/errorHandler'))

app.listen(PORT, ()=>{
    console.log(`Successfully connected to http://localhost:${PORT}`)
})

