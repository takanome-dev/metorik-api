import appwrite, { AppwriteCollections, DATABASE_ID } from "@/lib/appwrite";
import { presetJWT } from "@/utils/api";
import { Query } from "appwrite";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req

    if (method !== "POST") {
        res.setHeader("Allow", ["POST"])
        return res.status(405).json({ message: `Method ${method} not allowed` })
    }


    const { identifier } = req.query

    try {
        presetJWT(req, res)
        const userLogged = await appwrite.account.get()
        if (!userLogged.$id) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const foundEventByIdentifier = await appwrite.database.listDocuments(DATABASE_ID, AppwriteCollections.EVENTS, [Query.equal("identifier", identifier as string)])

        if (!foundEventByIdentifier.total) {
            return res.status(404).json({ message: "Event not found" })
        }

        const event = foundEventByIdentifier.documents[0]

        const eventsWithData = await appwrite.database.listDocuments(DATABASE_ID, AppwriteCollections.EVENTS_HAS_DATA, [Query.equal("event_id", event.$id),
        ])
        // reset all the events.value to 0
        for (const eventWithData of eventsWithData.documents) {
            await appwrite.database.updateDocument(DATABASE_ID, AppwriteCollections.EVENTS_HAS_DATA, eventWithData.$id, {
                value: 0
            })
        }

        return res.status(200).json({ message: "Event reset!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error", error: err })
    }

}