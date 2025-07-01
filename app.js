const express = require('express'); 
const app = express(); 

app.use(express.json()); 

let books = [
    {
        id: '1', 
        title: "Book 1"
    }, 
    {
        id: '2', 
        title: "Book 2"
    }
]; 

//intro route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to our bookstore api"
    });
});

// get all books route
app.get('/all', (req, res) => {
    res.json(books);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});