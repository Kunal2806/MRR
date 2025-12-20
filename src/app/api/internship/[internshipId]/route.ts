import { db } from "@/db";
import { JobInternshipTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ internshipId: string }> }
) {
  try {
    const { internshipId } = await params;
    console.log("Fetching internship:", internshipId);
    
    const data = await db.query.JobInternshipTable.findFirst({
        where: eq(JobInternshipTable.id, internshipId)
    })
    //   .select()
    //   .from(JobInternshipTable)
    //   .where(eq(JobInternshipTable.id, internshipId))
    //   .limit(1);
    
    // if (data.length === 0) {
    //   return NextResponse.json(
    //     { error: 'Internship not found' },
    //     { status: 404 }
    //   );
    // }
    
    // return NextResponse.json({ data: data[0] });
    // console.log(data)
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Cannot fetch data from internship table:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}