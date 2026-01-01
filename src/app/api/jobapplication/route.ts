import { db } from "@/db";
import { JobInternshipApplication } from "@/db/schema";
// import { error } from "console";
import { and, eq } from "drizzle-orm";
// import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    // const data = await request.json();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const internshipId = searchParams.get('internshipId');

    if(!userId || !internshipId){
        return NextResponse.json({
            Application: false
        })
    }
    const Application = await db.query.JobInternshipApplication.findFirst({
        where: and(
            eq(JobInternshipApplication.internshipJobId, internshipId),
            eq(JobInternshipApplication.userId, userId)
        )
    })
    if(!Application){
        return NextResponse.json({
            Application: false
        })
    }
    return NextResponse.json({
            Application: true
        })
}

export async function POST(request: NextRequest) {
    try{
        
        const {internshipId, userId} = await request.json();
        if(!userId || !internshipId) {
            throw new Error("first provide userID or internshipId")
        }

        const application = await db.query.JobInternshipApplication.findFirst({
            where: and(
                eq(JobInternshipApplication.userId, userId),
                eq(JobInternshipApplication.internshipJobId, internshipId)
            ),
        });

        if(application){
            return NextResponse.json({
                message: "Application Already Exists"
            })
        }

        await db.insert(JobInternshipApplication)
        .values({
            userId: userId,
            internshipJobId: internshipId
        })

        return NextResponse.json({
            message: "Applied Successfully!"
        })

    }catch(error) {
        console.log("cannot post error occured", error)
    }
}