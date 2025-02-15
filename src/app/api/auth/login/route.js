import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const uri = "mongodb+srv://webdev:n1u9HQuxTh4WUtEF@linktree.vrwkp.mongodb.net";

if (!uri) {
    throw new Error("MONGO_URI is not defined in environment variables.");
}

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

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        const collection = await connectToDb();
        const user = await collection.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        return NextResponse.json(
            { message: "Login successful", user: { _id: user._id, email: user.email, userName: user.username, AuthToken: user.authToken } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
    }
}
