import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const uri = "mongodb+srv://webdev:2OmPVj8DUdEaU1wR@apisindia.38dfp.mongodb.net";
const dbName = "UserAuth";
const collectionName = "signUp";

let cachedClient = null;
let cachedDb = null;

async function connectToDb() {
    if (cachedClient && cachedDb) {
        return cachedDb.collection(collectionName);
    }

    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return db.collection(collectionName);
}

// Reusable CORS headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Update this in production with your frontend origin
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Global error handler
function handleErrorResponse(res, error, status = 500) {
    return NextResponse.json(
        { message: error.message || "Internal Server Error" },
        { status, headers: corsHeaders }
    );
}

// Handle all OPTIONS requests for CORS preflight
export async function OPTIONS() {
    return NextResponse.json({}, { status: 204, headers: corsHeaders });
}

// POST: Login User
export async function POST(req) {
    try {
        const body = await req.json();
        const { username, password } = body;

        const collection = await connectToDb();
        const user = await collection.findOne({ username });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401, headers: corsHeaders }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401, headers: corsHeaders }
            );
        }

        return NextResponse.json(
            { message: "Login successful", user: { username: user.username } },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        return handleErrorResponse(null, error);
    }
}

// PUT: Create User
export async function PUT(req) {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { message: "Username and password are required" },
                { status: 400, headers: corsHeaders }
            );
        }

        const collection = await connectToDb();
        const existingUser = await collection.findOne({ username });

        if (existingUser) {
            return NextResponse.json(
                { message: "Username already exists" },
                { status: 400, headers: corsHeaders }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await collection.insertOne({ username, password: hashedPassword });

        return NextResponse.json(
            { message: "User created successfully!" },
            { status: 201, headers: corsHeaders }
        );
    } catch (error) {
        return handleErrorResponse(null, error);
    }
}
