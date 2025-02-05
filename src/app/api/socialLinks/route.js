
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = "mongodb://localhost:27017/webdev";
const client = new MongoClient(uri)
const dbName = "socialLinks";
const collectionName = "socialLinks01";

async function connectToDb() {
    await client.connect();
    const database = client.db(dbName);
    return database.collection(collectionName);
}


export async function POST(req) {
    try {
        const body = await req.json();
        const { url, username,title } = body;

        if (!url || !username || !title) {
            return new NextResponse("URL and Username are required", { status: 400 });
        }

        const collection = await connectToDb();
        const result = await collection.insertOne({ url, username,title });

        return NextResponse.json(
            { message: "Data added successfully!", data: result },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        console.log("body", body);

        const { url } = body;

        if (!url) {
            return NextResponse.json({ message: "Edit Successfully" }, { status: 400 })
        }
        const collection = await connectToDb()
        const result = await collection.updateOne({}, { $set: { url } });

        if (result.modifiedCount === 0) {
            return NextResponse.json(
                { message: "No document found with the provided ID." },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Data updated successfully!", data: body });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
        await client.close();
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


export async function DELETE(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      console.log(id,"id");
      
  
      if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
      }
  
      // Ensure the id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
      }
  
      const collection = await connectToDb();
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return NextResponse.json({ message: "No document found with the provided ID" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Data deleted successfully!" });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } finally {
      await client.close();
    }
  }