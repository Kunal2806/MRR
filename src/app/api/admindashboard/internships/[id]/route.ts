import { db } from '@/db';
import { IsHome, JobInternshipTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for internships
// Replace this with your actual database in production
// let internships: any[] = [];

// PUT - Update existing internship

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Internship ID is required" },
        { status: 400 }
      );
    }

    const updateData = {
      title: body.title,
      ishome: body.ishome ?? 'no',
      domain: body.domain,
      status: body.status ?? "open",
      mode: body.mode ?? null,
      level: body.level ?? null,
      stipend: body.stipend ?? null,
      certificate: body.certificate ?? null,
      deadline: body.deadline ?? null,
      bgColor: body.bgColor ?? null,
      borderColor: body.borderColor ?? null,
      overview: body.overview ?? null,
      eligibility: body.eligibility ?? [],
      tasks: body.tasks ?? [],
      technologyStack: body.technologyStack ?? [],
      submissionProcess: body.submissionProcess ?? [],
      timeline: body.timeline ?? null,
      criteria: body.criteria ?? [],
      interviewCall: body.interviewCall ?? null,
    };

    const [updatedInternship] = await db
      .update(JobInternshipTable)
      .set(updateData)
      .where(eq(JobInternshipTable.id, body.id))
      .returning();

    if (!updatedInternship) {
      return NextResponse.json(
        { success: false, error: "Internship not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      // data: updatedInternship,
      message: "Internship updated successfully",
    });
  } catch (error) {
    console.error("Error updating internship:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update internship" },
      { status: 500 }
    );
  }
}


// DELETE - Delete internship
export async function DELETE(request: NextRequest, {params} : {params : Promise<{id: string}>} ) {
  try {
    // const { searchParams } = new URL(request.url);
    // const id = searchParams.get("id");
    const {id} = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Internship ID is required" },
        { status: 400 }
      );
    }

    await db
      .delete(JobInternshipTable)
      .where(eq(JobInternshipTable.id, id))

    return NextResponse.json({
      success: true,
      // data: deletedInternship,
      message: "Internship deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting internship:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete internship" },
      { status: 500 }
    );
  }
}
