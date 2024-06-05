const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port || 5000;
require("dotenv").config()

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Smart Fashion Server is Running");
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q3g5zjn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7) 
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Define collections
    const usersCollection = client.db("Zephyra").collection("users");
    const productsCollection = client.db("Zephyra").collection("products");

    // Function to generate a unique 6-digit number for itemNumber
    const generateUniqueitemNo = async () => {
    let isUnique = false;
    let itemNo;
    while (!isUnique) {
        // Generate a 6-digit number
        itemNo = Math.floor(100000 + Math.random() * 900000);
        
        // Check if the generated itemNo already exists in the collection
        const existingItemNo = await reportDataCollection.findOne({ itemNo });
        if (!existingItemNo) {
        isUnique = true;
        }
    }
    return itemNo;
    };

    // POST /users endpoint to create a new user
    app.post('/users', async (req, res) => {
      const userData = req.body;
      const userEmail = userData?.email;
  
      try {
      // Check if a user with the given email already exists
      const checkUserExist = await usersCollection.findOne({ email: userEmail });
      if (checkUserExist) {
         return res.status(400).json({ message: 'User with this email already exists.' });
      }
  
      // Create a new user if email is not found
      const result = await usersCollection.insertOne(userData);
      res.status(201).send(result);
      } catch (error) {
         console.error('Error creating user:', error);
         res.status(500).json({ message: 'Internal server error' });
      }
    });

    //GET /products endpoint to get all product data
    app.get("/products", async(req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result)
    })

    //PATCH /products endpoint to update product data
    app.patch("/products/:id", async(req, res) => {
      const id = req.params.id;
      console.log("🚀 ~ app.patch ~ id:", id)
      const query = {category: id};
      const updateDoc = {$set:{
        thumbnail: "https://i.ibb.co/3s7hJKD/laptop.png"
      }}
      const result = await productsCollection.updateMany(query, updateDoc);
      console.log("🚀 ~ app.patch ~ result:", result)
      res.send(result)
    })

    

  } finally {
      // Ensures that the client will close when you finish/error
  //   await client.close();
  }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log("Smart Fashion Server Setting on", port)
})