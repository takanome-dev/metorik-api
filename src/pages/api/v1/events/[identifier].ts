import { AppwriteCollections, DATABASE_ID } from "@/lib/appwrite";
import { Query, Client, Databases } from "node-appwrite";
import { NextApiRequest, NextApiResponse } from "next";


const sdk = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY)

const dbs = new Databases(sdk)



export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req

    if (method !== "POST") {
        res.setHeader("Allow", ["POST"])
        return res.status(405).json({ message: `Method ${method} not allowed` })
    }


    const { identifier } = req.query
    const token = req.headers.authorization?.replace('Bearer ', '')
    res.status(200).json({ message: token })
}