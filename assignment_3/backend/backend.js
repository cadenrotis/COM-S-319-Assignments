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
