import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const uri = process.env.MONGO_URI; // Store in .env
const client = new MongoClient(uri);
const dbName = "auth";
const collectionName = "auth01";
const JWT_SECRET = process.env.JWT_SECRET; // Secure secret key

async function connectToDb() {
  await client.connect();
  const database = client.db(dbName);
  return database.collection(collectionName);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password, confirmPassword } = body;

    // Validate required fields
    if (!username || !email || !password || !confirmPassword) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return new Response(
        JSON.stringify({ message: "Passwords do not match" }),
        { status: 400 }
      );
    }

    const collection = await connectToDb();

    // Check if user already exists
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "Username already exists" }),
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const result = await collection.insertOne({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token with userId
    const token = jwt.sign(
      { userId: result.insertedId, username, email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Update user record with authToken
    await collection.updateOne(
      { _id: result.insertedId },
      { $set: { authToken: token } }
    );

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        userId: result.insertedId,
        token, // Send token in response
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "An error occurred", error: error.message }),
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
