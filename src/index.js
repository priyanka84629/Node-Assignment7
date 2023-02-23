const express = require('express')
const app = express()
const bodyParser = require("body-parser");
let studentArray = require("./InitialData");

const path = require("path")
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get("/api/student", async (req, res) => {
    res.status(200).send(studentArray);
})
//---------------
app.get("/api/student/:id", (req, res) => {
    const userdata = studentArray.find((data) => { data.id == req.params.id; });
    res.status(200).json({
        status: "success",
        userdata
    })
})

function isvalid(name, currentClass, division) {
    let isUserValid = true;
    if (name.length <= 0) isUserValid = false;
    if (division.length <= 0) isUserValid = false;
    return isUserValid;
}

app.post("/api/student", async (req, res) => {
    let id = new Date().getTime();
    if (await isvalid(req.body.name, req.body.currentClass, req.body.division)) {
        studentArray.push({
            id: id,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        })
        res.status(200).json({
            status: "success",
            result: (`${id} is sucessfully created `)
        })
    } else {
        res.status(400).json({
            status: "failed",
            result: "invalid field"
        })
    }
});

app.put("/api/student/:id", (req, res) => {
    const updatedData = studentArray.find((obj) => {
        if (obj.id == req.params.id) {
            return {
                name: req.body.name,
                currentClass: req.body.currentClass,
                division: req.body.division
            }
        }

    })
    console.log(updatedData)

    res.status(200).json({

    })
})

app.delete("/api/student/:id", async (req, res) => {
    try {
        studentArray = await studentArray.filter((user) => {
            return (user.id != req.params.id);
        })
        res.status(200).json({
            status: "success",
            Rest_Data: studentArray
        })
    } catch (e) {
        res.status(400).send(e.message)
    }
})


app.delete("*", (req, res) => {
    res.status(400).send("not matched")
})
app.put("*", (req, res) => {
    res.status(400).send("not matched")
})
app.get("*", (req, res) => {
    res.status(400).send("not matched")
})
app.post("*", (req, res) => {
    res.status(400).send("not matched")
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;