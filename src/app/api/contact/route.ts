// export default function GET() {
//     console.log("working")
// }

import { db } from "@/db";
import { Contact } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try{
        const data = await request.json();
        if(!data.fullname || !data.email || !data.number || !data.querytype || !data.message) {
            return NextResponse.json({
                "message": "data is incomplete"
            });
        }
        await db.insert(Contact).values({
            fullname: data.fullname,
            email: data.email,
            number: data.number,
            querytype: data.querytype,
            message: data.message
        })
        return NextResponse.json({
            "message": "thanks to contact"
        })
    }catch(error) {
        console.error(error);
        return NextResponse.json({"message": "cannot contact"})
    }
    
}