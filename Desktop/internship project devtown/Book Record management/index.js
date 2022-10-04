const express = require("express");
const {users} = require("./data/users.json");   // json data import

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running",
    });
});

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




app.get("*", (req, res) => {
        res.status(404).json({
            message: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

