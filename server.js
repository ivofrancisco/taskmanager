const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Database connection
connectDB();

// Init middleware 
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to Taskmanager API'});
});

// Define routes 
app.use('/api/users/', require('./routes/users'));
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/tasks/', require('./routes/tasks'));


// Setting port variable
const PORT = process.env.PORT || 5000;
// Creating Server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));