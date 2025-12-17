import { db } from "@/db";
import { UserDataTable, UserRole, UsersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TicketX } from "lucide-react";
// import { sync } from "framer-motion";

interface UserData {
  email: string;
  name: string;
  password: string;
  role: (typeof UserRole.enumValues)[number];
}

// export async function createUser(data: UserData) {
//   try {
//     const results = await db
//       .insert(UsersTable)
//       .values({
//         email: data.email,
//         name: data.name,
//         password: data.password,
//         role: data.role,
//         updatedAt: new Date(),
//       })
//       .returning();
//     return results[0] || null;
//   } catch (error) {
//     console.error(
//       `Error deleting email-verification-token with data: ${data}`,
//       error
//     );
//     throw error;
//   }
// }

export async function createUser(data: UserData) {
  try{
    const result = await db.transaction(async (tx) => {
      const [user] = await tx
      .insert(UsersTable)
      .values({
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role,
        updatedAt: new Date(),
      })
      .returning();
      if(!user){
        throw new Error("User Creation Failed");
      }

      await tx
      .insert(UserDataTable)
      .values({
        userId: user.id
      })

      return user;
  })
  return result;
}   catch (error) {
  console.error("Error creating user and profile", error);
  throw error;
}
}

export async function deleteUser(id: string) {
  try {
    await db.delete(UsersTable).where(eq(UsersTable.id, id));
  } catch (error) {
    console.error(`Error deleting user with id: ${id}`, error);
    throw error;
  }
}

export async function findUserById(id: string) {
  try {
    return await db.query.UsersTable.findFirst({
      where: eq(UsersTable.id, id),
    });
  } catch (error) {
    console.error(`Error finding user by id: ${id}`, error);
    throw error;
  }
}

export async function findUserByEmail(email: string) {
  try {
    return await db.query.UsersTable.findFirst({
      where: eq(UsersTable.email, email),
    });
  } catch (error) {
    console.error(`Error finding user by email: ${email}`, error);
    throw error;
  }
}

export async function markUserEmailVerified(userId: string) {
  try {
    await db
      .update(UsersTable)
      .set({
        emailVerified: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(UsersTable.id, userId));
  } catch (error) {
    console.error("Error on creating user", error);
    throw error;
  }
}
