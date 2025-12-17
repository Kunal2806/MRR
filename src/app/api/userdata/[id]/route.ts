import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { UserDataTable } from "@/db/schema";
import { eq } from "drizzle-orm";

/* ---------------- GET ---------------- */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const userData = await db.query.UserDataTable.findFirst({
      where: eq(UserDataTable.userId, id),
    });

    if (!userData) {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 }
      );
    }

    // Transform database fields to match frontend expectations
    return NextResponse.json({
      ...userData,
      birthdate: userData.birthdate ? new Date(userData.birthdate).toLocaleDateString('en-GB') : '',
      github: userData.githubLink,
      linkedin: userData.linkedinLink,
      portfolio: userData.portfolioLink,
      socialLink: userData.socialLinks || [],
      skills: userData.skillsAndExpertise || [],
    });
  } catch (error) {
    console.error("GET /api/userdata error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/* ---------------- PUT ---------------- */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const data = await request.json();
    
    console.log("Updating user data for:", id);
    console.log("Data received:", data);

    // Check if user data exists first
    const existingData = await db.query.UserDataTable.findFirst({
      where: eq(UserDataTable.userId, id),
    });

    if (!existingData) {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 }
      );
    }

    // Parse birthdate if it's a string in DD/MM/YYYY format
    let parsedBirthdate = existingData.birthdate;
    if (data.birthdate && typeof data.birthdate === 'string') {
      const [day, month, year] = data.birthdate.split('/');
      if (day && month && year) {
        parsedBirthdate = new Date(`${year}-${month}-${day}`);
      }
    }

    // Update with validated data - map frontend field names to database field names
    const [updatedUser] = await db
      .update(UserDataTable)
      .set({
        status: data.status || existingData.status,
        phone: data.phone || existingData.phone,
        location: data.location || existingData.location,
        birthdate: parsedBirthdate,
        githubLink: data.github || existingData.githubLink,
        linkedinLink: data.linkedin || existingData.linkedinLink,
        portfolioLink: data.portfolio || existingData.portfolioLink,
        socialLinks: data.socialLink || existingData.socialLinks,
        skillsAndExpertise: data.skills || existingData.skillsAndExpertise,
        roleInterests: data.roleInterests || existingData.roleInterests,
        careerGoals: data.careerGoals || existingData.careerGoals,
        availability: data.availability || existingData.availability,
        academic: data.academic || existingData.academic,
      })
      .where(eq(UserDataTable.userId, id))
      .returning();

    console.log("Update successful:", updatedUser);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PUT /api/userdata error:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}