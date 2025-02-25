import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "sociaTreeAuth";
const collectionName = "sociaTreeAuth01";
const JWT_SECRET = "123321"; // Secure secret key

async function connectToDb() {
  await client.connect();
  const database = client.db(dbName);
  return database.collection(collectionName);
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const bucketName = process.env.AWS_BUCKET_NAME;

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

export async function PUT(req) {
  try {
    const formData = await req.formData();

    // Destructure fields from formData
    const username = formData.get("username"); // Ensure username is sent in the formData
    const profileName = formData.get("profileName");
    const profileImage = formData.get("profileImage");
    const customColor = formData.get("customColor");
    const Bio = formData.get("Bio");
    const chooseTemplate = formData.get("chooseTemplate");

    const updateData = {};
    if (profileName) updateData.profileName = profileName;
    if (customColor) updateData.customColor = customColor;
    if (Bio) updateData.Bio = Bio;
    if (chooseTemplate) updateData.chooseTemplate = chooseTemplate;

    // Handle image upload
    if (profileImage && profileImage.size > 0) {
      const uniqueFileName = `${uuidv4()}_${profileImage.name}`;
      const uploadParams = {
        Bucket: bucketName,
        Key: `profiles/${uniqueFileName}`,
        Body: Buffer.from(await profileImage.arrayBuffer()),
        ContentType: profileImage.type
      };

      const uploadResult = await s3.upload(uploadParams).promise();
      updateData.profileImage = uploadResult.Location;
    }

    // Update MongoDB document
    const collection = await connectToDb();
    const result = await collection.updateOne(
      { username: username },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "No document found with the provided username" }, { status: 404 });
    }

    return NextResponse.json({ message: "Content updated successfully", result });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json({ message: `An error occurred: ${error.message}` }, { status: 500 });
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