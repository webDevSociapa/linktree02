import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export const runtime = "edge";  // Specify that this route uses the edge runtime

const uri = "mongodb://localhost:27017/webdev";
const client = new MongoClient(uri);
const dbName = "singup";
const collectionName = "signup01";

async function connectToDb() {
  await client.connect();
  const database = client.db(dbName);
  return database.collection(collectionName);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(
        JSON.stringify({ message: "Username and password are required" }),
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

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user
    const result = await collection.insertOne({
      username,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        userId: result.insertedId,
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
