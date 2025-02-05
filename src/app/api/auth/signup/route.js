import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = "mongodb+srv://webdev:2OmPVj8DUdEaU1wR@apisindia.38dfp.mongodb.net";
const client = new MongoClient(uri);
const dbName = "linktreeSign";
const collectionName = "linktreeSign01";

async function connectToDb() {
  await client.connect();
  const database = client.db(dbName);
  return database.collection(collectionName);
}

// Named export for POST method
export async function POST(req) {
  try {
    const body = await req.json(); // Use `req.json()` to parse the body
    const { username, password,email } = body;

    if (!username || !password || !email) {
      return new Response(
        JSON.stringify({ message: "Username and password & Email are required" }),
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
      email: email,
      membership: "0",
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
