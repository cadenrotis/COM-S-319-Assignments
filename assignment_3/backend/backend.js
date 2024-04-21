var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs"); // not required this time since we aren't reading from a file
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// MongoDB
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

// GET method to show/read all products contained in Mongo database
app.get("/listProducts", async (req, res) => {
    await client.connect(); // connects NodeJS to MongoDB

    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("fakestore_catalog")
        .find(query)
        .limit(100)
        .toArray();

    console.log(results);
    res.status(200);
    res.send(results);
});

// GET method to retrieve the product that matches the requested id
app.get("/:id", async (req, res) => {
    const productid = Number(req.params.id);
    console.log("Product to find :", productid);

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { "id": productid };

    const results = await db.collection("fakestore_catalog")
        .findOne(query);

    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

// POST method to add a new product to the database/product catalog
app.post("/addProduct", async (req, res) => {

    // use try-and-catch in case the server finds an error
    try {
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        const newDocument = {
            "id": req.body.id,
            "title": req.body.title,
            "price": req.body.price,
            "description": req.body.description,
            "category": req.body.category,
            "image": req.body.image,
            "rating": {
                "rate": req.body.rating.rate,
                "count": req.body.rating.count
            }
        };
        console.log(newDocument);

        const results = await db
            .collection("fakestore_catalog")
            .insertOne(newDocument);
        res.status(200);
        res.send(results);
    }

    catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }

});

// PUT method to update the price of a product existing in the database
app.put("/updateProduct/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };

    await client.connect();
    console.log("Product to Update :", id);

    // Data for updating the document, typically comes from the request body
    console.log(req.body);

    const updateData = {
        $set: {
            "price": req.body.price,
        }
    };

    // read data from robot to update to send to frontend
    const productUpdated = await db.collection("fakestore_catalog").findOne(query);

    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = {};
    const results = await db.collection("fakestore_catalog").updateOne(query, updateData, options);

    // If no document was found to update, you can choose to handle it by sending a 404 response
    if (results.matchedCount === 0) {
        return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200);
    res.send(productUpdated);
});

// DELETE method to delete the requested product from the catalog
app.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        await client.connect();
        console.log("Product to delete:", id);

        const query = { id: id };

        // read data from robot to delete to send it to frontend to validate what you're deleting
        const robotDeleted = await db.collection("fakestore_catalog").findOne(query);

        // delete
        const results = await db.collection("fakestore_catalog").deleteOne(query);
        res.status(200);
        res.send(robotDeleted);
    }
    catch (error) {
        console.error("Error deleting robot:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log("App listening at http://127.0.0.1:27017", host, port);
});
