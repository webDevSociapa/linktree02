
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = "mongodb+srv://webdev:n1u9HQuxTh4WUtEF@linktree.vrwkp.mongodb.net/?retryWrites=true&w=majority&appName=linktree";
const client = new MongoClient(uri)
const dbName = "LinkManager";
const collectionName = "LinkManager01";

async function connectToDb() {
    await client.connect();
    const database = client.db(dbName);
    return database.collection(collectionName);
}


export async function POST(req) {
    try {
        const body = await req.json();
        const { url, username, title,id } = body;

        if (!url || !username || !title || !id) {
            return new NextResponse("URL and Username are required", { status: 400 });
        }

        const collection = await connectToDb();
        const result = await collection.insertOne({ url, username, title });

        return NextResponse.json(
            { message: "Data added successfully!", data: result },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function PUT(req, { params }) {
    
    try {
        const { id } = params; // Extracting ID from URL params
        const body = await req.json();
        console.log("Request Body:", body);

        const { url, title } = body; // Extract other data from request body

        if (!id || !url || !title) {
            return NextResponse.json(
                { message: "ID, URL, and title are required." },
                { status: 400 }
            );
        }

        const db = await connectToDb();
        const collection = db.collection("socialLinks"); // Use your actual collection name

        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, // Filter by ID from URL
            { $set: { url, title } } // Update fields
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { message: "No document found with the provided ID." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Data updated successfully!", data: { id, url, title } },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");

        if (!username) {
            return NextResponse.json({ message: "Username is required" }, { status: 400 });
        }

        const collection = await connectToDb();
        const data = await collection.find({ username }).toArray();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function DELETE(req) {
    console.log("1111",req);
    
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        console.log("idididid",id);
        
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        // Ensure the id is a valid ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
        }

        const collection = await connectToDb();
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "No document found with the provided ID" }, { status: 404 });
        }

        return NextResponse.json({ message: "Data deleted successfully!" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}