import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = "mongodb+srv://webdev:n1u9HQuxTh4WUtEF@linktree.vrwkp.mongodb.net/?retryWrites=true&w=majority&appName=linktree";
const client = new MongoClient(uri);
const dbName = "chooseTemplate";
const collectionName = "chooseTemplate01";

async function connectToDb() {
    await client.connect();
    const database = client.db(dbName);
    return database.collection(collectionName);
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, templateId, profileName, bio, image, linksData, bgcolor } = body;

        if (!templateId || !userId) {
            return NextResponse.json({ error: "User ID and Template ID are required" }, { status: 400 });
        }

        const collection = await connectToDb();

        // Check if user exists
        const user = await collection.findOne({ userId });

        if (user) {
            // Update existing user with selected template details
            const updateResult = await collection.updateOne(
                { userId },
                {
                    $set: {
                        selectedTemplate: templateId,
                        profileName,
                        bio,
                        image,
                        linksData,
                        bgcolor,
                    },
                }
            );

            if (updateResult.modifiedCount === 0) {
                return NextResponse.json({ error: "Failed to update template selection" }, { status: 500 });
            }
        } else {
            // Insert new user with template details
            await collection.insertOne({
                userId,
                selectedTemplate: templateId,
                profileName,
                bio,
                image,
                linksData,
                bgcolor,
            });
        }

        return NextResponse.json(
            { message: "Template selected successfully", selectedTemplate: templateId },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error selecting template:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
