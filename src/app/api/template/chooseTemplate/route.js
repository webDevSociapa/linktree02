import { MongoClient } from "mongodb";


export async function POST(req){
    const templateData = req.body;
    console.log("templateData",templateData);

    const client = new MongoClient("mongodb://localhost:27017");
    const db = client.db("mydatabase");
    const collection = db.collection("mycollection");

}  