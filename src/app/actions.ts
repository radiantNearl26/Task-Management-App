"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export type Task = {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
  created_at?: Date;
};

export async function seedDatabase() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id VARCHAR(255) PRIMARY KEY,
        title TEXT NOT NULL,
        status VARCHAR(50) NOT NULL,
        label VARCHAR(50) NOT NULL,
        priority VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return { success: true };
  } catch (error) {
    console.error("Failed to seed database:", error);
    return { success: false, error };
  }
}

export async function getTasks() {
  try {
    // Ensure table exists and is seeded on first load (convenience for development)
    // In production, you'd run a migration script separately.
    await seedDatabase();

    const { rows } = await sql`SELECT * FROM tasks ORDER BY created_at DESC`;
    // Cast to Task type if needed, but the structure matches
    return rows as Task[];
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const status = formData.get("status") as string;
  const priority = formData.get("priority") as string;
  const label = formData.get("label") as string;

  // Generate a simple ID like T-XXX.
  // For production, use UUID or let DB handle SERIAL ID.
  // Here we stick to string ID to match existing type.
  const id = `T-NEW-${Date.now()}`;

  await sql`
    INSERT INTO tasks (id, title, status, label, priority)
    VALUES (${id}, ${title}, ${status}, ${label}, ${priority})
  `;

  revalidatePath("/");
  return { success: true };
}

export async function deleteTask(id: string) {
  await sql`DELETE FROM tasks WHERE id = ${id}`;
  revalidatePath("/");
  return { success: true };
}
