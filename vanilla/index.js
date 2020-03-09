const express = require('express');
const app = express();
const port = 3000;
const baseUrl = `v1`;
const projectID = `profiles`;


app.get('/', (req, res) => res.send('Hello to WoW Cloud!'))

app.get(`/${baseUrl}/${projectID}`, (req, res) => {
    res.send('You should be getting all entities!');
})

//Create
app.post(`/${baseUrl}/${projectID}/:id`, (req, res) => {
    res.send('You are creating an entity!');
})

//Read
app.get(`/${baseUrl}/${projectID}/:id`, (req, res) => {
    res.send(`You should be getting data about entity: ${req.params.id}!`);
})

//Update
app.put(`/${baseUrl}/${projectID}/:id`, (req, res) => {
    res.send(`You are updating entity: ${req.params.id}!`);
})

//Delete
app.delete(`/${baseUrl}/${projectID}/:id`, (req, res) => {
    res.send(`You are deleting entity: ${req.params.id}!`);
})

app.listen(port, () => {
    console.log(`Welcome WoW Clouders! I am listening at port: ${port}!`);
})