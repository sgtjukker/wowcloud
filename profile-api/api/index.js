const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();
const CustomerProfile = require('./lib/CustomerProfile');
const app = express();
const port = 1337;
const baseUrl = `v1`;
const projectID = `profiles`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get(`/${baseUrl}/${projectID}`, (req, res) => {
    res.send('You should be getting all entities!');
})

//Create
app.post(`/${baseUrl}/${projectID}`, async (req, res) => {
    const customerFromBody = req.body;
    var mappedCustomerProfile = CustomerProfile();
    mappedCustomerProfile.initData(true);

    mappedCustomerProfile.setData(customerFromBody);

    //TODO: Check if customer already exists before trying to create


    const taskKey = datastore.key({
        namespace: 'Profile',
        path: ['CustomerProfile']
    });

    const entity = {
        key: taskKey,
        data: mappedCustomerProfile.getData()
    };

    await datastore.insert(entity);
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(200, `CustomerProfile ${taskKey.id} saved to DataStore.`);
})

//Read
app.get(`/${baseUrl}/${projectID}/:id`, async (req, res) => {
    console.log("test");
    var id = req.params.id;
    const query = datastore.createQuery('Profile', 'CustomerProfile').filter('customerID', '=', id);
    const [customerProfile] = await datastore.runQuery(query);
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(customerProfile);
})

app.post(`/${baseUrl}/${projectID}/login`), async (req, res) => {
    console.log("req.body: ", req.body);
    var emailAddress = req.body.emailAdress;
    var password = req.body.password;
    const query = datastore.createQuery('Profile', 'CustomerProfile').filter('customerID', '=', id);
    const [customerProfile] = await datastore.runQuery(query);

    if (customerProfile.emailAddress === emailAddress &&
        customerProfile.password === password)
        res.send({ allowed: true });
    else
        res.send({ allowed: false });

}

//Update
app.put(`/${baseUrl}/${projectID}/:id`, async (req, res) => {
    const customerFromBody = req.body;
    const id = req.params.id;

    //Delete
    const query = datastore.createQuery('Profile', 'CustomerProfile').filter('customerID', '=', id);
    const [customerProfile] = await datastore.runQuery(query);
    var mappedCustomerProfile = CustomerProfile();
    mappedCustomerProfile.initData(false);

    customerFromBody.customerID = id;
    mappedCustomerProfile.setData(customerFromBody);
    // TODO: Must check before delete that the profile exists!
    const deletequery = await datastore.delete(customerProfile[0][datastore.KEY]);
    
    //Insert
  

    //TODO: Check if customer already exists before trying to create


    const taskKey = datastore.key({
        namespace: 'Profile',
        path: ['CustomerProfile']
    });

    const entity = {
        key: taskKey,
        data: mappedCustomerProfile.getData()
    };

    await datastore.insert(entity);
    res.setHeader("Access-Control-Allow-Origin", "*")
    //äääää
    res.send(`You are updating CustomerProfile: ${customerProfile.Key}!`);
})

//Delete
app.delete(`/${baseUrl}/${projectID}/:id`, async (req, res) => {
    var id = req.params.id;
    const query = datastore.createQuery('Profile', 'CustomerProfile').filter('customerID', '=', id);
    const [customerProfile] = await datastore.runQuery(query);
    // TODO: Must check before delete that the profile exists!
    const deletequery = await datastore.delete(customerProfile[0][datastore.KEY]);
    res.send(`You are deleting entity: ${customerProfile[0][datastore.KEY].id}!`);
})

//Login
app.post(`/${baseUrl}/login`, async (req, res) => {

    console.log("Login");

    res.send(200, `Customer logged in.`);
})



app.get('/', (req, res) => res.send('Hello to WoW Cloud! Alla fubbickar testing'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
