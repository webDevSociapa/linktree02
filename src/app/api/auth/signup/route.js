import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecretKey";

let clientPromise;

if (!global._mongoClientPromise) {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function connectToDb() {
  const client = await clientPromise;
  return client.db("auth").collection("auth01");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password, confirmPassword } = body;

    if (!username || !email || !password || !confirmPassword) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    if (password !== confirmPassword) {
      return new Response(JSON.stringify({ message: "Passwords do not match" }), { status: 400 });
    }

    const collection = await connectToDb();

    // Check if username or email already exists
    const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Username or email already exists" }), { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await collection.insertOne({ username, email, password: hashedPassword });

    const token = jwt.sign(
      { userId: result.insertedId, username, email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Attach token to the user
    await collection.updateOne({ _id: result.insertedId }, { $set: { authToken: token } });

    return new Response(JSON.stringify({ message: "User created successfully", userId: result.insertedId, token }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occurred", error: error.message }), { status: 500 });
  }
}
