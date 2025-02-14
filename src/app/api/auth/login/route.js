import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // ⏳ Set a 5s timeout for DB connection
    });
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

const dbName = "auth";
const collectionName = "auth01";

async function connectToDb() {
    const client = await clientPromise;
    return client.db(dbName).collection(collectionName);
}

// POST: Login User
export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Connect to DB
        const collection = await connectToDb();
        const user = await collection.findOne({ email });

        console.log("Fetched User:", user);

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Login success response
        return NextResponse.json(
            { message: "Login successful", user: { _id: user._id, email: user.email, userName: user.username, AuthToken: user.authToken } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { message: "Something went wrong", error: error.message },
            { status: 500 }
        );
    }
}
