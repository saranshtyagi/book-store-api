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

//get a single book based on id 
app.get('/all/:id', (req, res) => {
    const bookId = req.params.id; 
    const singleBook = books.find((book) => book.id === bookId); 
    if(singleBook) {
        res.status(200).send(singleBook);
    }
    else {
        res.status(404).send("Book not found");
    }
})

//add a new book 
app.post('/add', (req, res) => {
    const newBook = {
        id: `${books.length + 1}`, 
        title: `Book ${books.length + 1}`
    }
    books.push(newBook); 
    res.status(200).json({
        data: newBook, 
        message: 'New book added successfully'
    });
});

//update a book 
app.put('/update/:id', (req, res) => {
    const bookId = req.params.id; 
    const findCurrentBook = books.find((bookItem) => bookItem.id === bookId); 
    if(findCurrentBook) {
        findCurrentBook.title = req.body.title || findCurrentBook.title; 

        res.status(200).json({
            message: `Book with ID ${bookId} updated successfully`,
            data: findCurrentBook
        });
    }
    else {
        res.status(404).json({
            message: "Book not found"
        });
    }
});

//delete a book 
app.delete('/delete/:id', (req, res) => {
    const bookId = req.params.id; 
    const findIndexOfCurrentBook = books.findIndex((bookItem) => bookItem.id === bookId);
    if(findIndexOfCurrentBook != -1) {
        const deletedBook = books.splice(findIndexOfCurrentBook, 1); 
        res.status(200).json({
            message: "Book deleted successfully", 
            data: deletedBook[0]
        });
    }
    else {
        res.status(404).json({
            message: 'Book not found'
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});