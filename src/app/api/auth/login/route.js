import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const uri = "mongodb+srv://webdev:2OmPVj8DUdEaU1wR@apisindia.38dfp.mongodb.net";
const client = new MongoClient(uri);
const dbName = "auth";
const collectionName = "auth01";

async function connectToDb() {
    await client.connect();
    const database = client.db(dbName);
    return database.collection(collectionName);
}



// POST: Login User
export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        console.log("body", body);


        const collection = await connectToDb();
        const user = await collection.findOne({ email });

        console.log("user", user);


        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isPasswordValid = await (password, user.password);

        console.log("isPasswordValid", user.password, password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "Login successful", user: { email: user.email, userName: user.username }, },
            { status: 200 }
        );
    } catch (error) {
        return handleErrorResponse(null, error);
    }
}

