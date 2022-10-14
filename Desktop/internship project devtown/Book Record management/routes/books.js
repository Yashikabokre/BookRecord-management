const express = require("express");
const {books} = require("../data/books.json");
const { users } = require("../data/users.json");


const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description : Get all book
 * Access: Public 
 * Parameters: None 
 */
router.get("/", (req, res) => {
    res.status(200).json({success: true, data: books });
})

/**
 * Route: /books/:id
 * Method: GET
 * Description : Get all book
 * Access: Public 
 * Parameters: id
 */
router.get("/:id", (req, res) => {
    const{id} = req.params;

    const body = books.find((each) => each.id === id);

    if(!book) 
        return res.status(404).json({
            success: false,
            message: "Book not found "
        });

    return res.status(200).json({
        success: true,
        data: book,
    });
});

/**
 * Route: /books/issued/books
 * Method: GET
 * Description : Get all issued  book
 * Access: Public 
 * Parameters: none
 */
router.get("/issued/books",(req,res) => {
    const userswithIssuedBooks = users.filter((each) => {
        if(each.issuedBook) return each;
    });

    console.log(userswithIssuedBooks);

    const issuedBooks = [];

    userswithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });

    if(issuedBooks.length === 0)
    return res.status(404).json({
        success: false,
        message: "No books issued yet",
    });

    return res.status(200).json({
        success: true,
        data: issuedBooks,
    });
});

//default export
module.exports = router;