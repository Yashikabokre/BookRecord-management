const express = require("express");

//importing routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");


const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running",
    });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

/**
 * Route: /users
 * Method: GET
 * Description : Get all user
 * Access: Public 
 * Parameters: None 
 */

app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Method: GET✅
 * Description : Get single user by id  
 * Access: Public 
 * Parameters: id
 */

app.get("/users/:id", (req,res) =>{ 
    const {id} = req.params;
    const users = users.find((each) => each.id === id);
    if(!users) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return res.status(200).json({
        success: true,
        data: users
    });

});

/**
 * Route: /users/:id
 * Method: POST
 * Description : Create new user
 * Access: Public 
 * Parameters: none
 */

app.post("/users", (req,res) => {
    const {id, name , surname, email, subscriptionType, subscriptionDate} = 
        req.body;

    const user = users.find((each) => each.id === id)

    if(user) {
        return res.status(404).json({
            success: false,
            message: "User exists with this id",
        });
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });

    return res.status(201).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Method: Put
 * Description : Updating user data
 * Access: Public 
 * Parameters: id
 */

app.put("/users/:id", (req,res) => {
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each) => each.id === id);

    if(!user) 
        return res.status(404).json({success: false, message: "User not found"});

    const updateUser = users.map((each) => {
        if (each.id === id){
            return{
                ...each,
                ...data,
            };
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data: updateUser,
    });
});

/**
 * Route: /users/:id
 * Method: Delete
 * Description : Delete a user by id
 * Access: Public 
 * Parameters: id
 */

app.delete('/users/:id', (req,res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted was not found",
        });
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(202).json({success: true, data: users });
});

app.get("*", (req, res) => {
        res.status(404).json({
            message: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});