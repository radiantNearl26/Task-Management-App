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
  try {
    const title = formData.get("title") as string;
    const status = formData.get("status") as string;
    const priority = formData.get("priority") as string;
    const label = formData.get("label") as string;

    // Generate ID in format YYMMDD-HHMMSS
    const now = new Date();
    const yy = now.getFullYear().toString().slice(-2);
    const mm = (now.getMonth() + 1).toString().padStart(2, "0");
    const dd = now.getDate().toString().padStart(2, "0");
    const hh = now.getHours().toString().padStart(2, "0");
    const min = now.getMinutes().toString().padStart(2, "0");
    const ss = now.getSeconds().toString().padStart(2, "0");
    const id = `${yy}${mm}${dd}-${hh}${min}${ss}`;

    await sql`
      INSERT INTO tasks (id, title, status, label, priority)
      VALUES (${id}, ${title}, ${status}, ${label}, ${priority})
    `;

    revalidatePath("/");
    return { success: true, message: "Task created successfully" };
  } catch (error) {
    console.error("Failed to create task:", error);
    return { success: false, message: "Failed to create task" };
  }
}

export async function deleteTask(id: string) {
  await sql`DELETE FROM tasks WHERE id = ${id}`;
  revalidatePath("/");
  return { success: true };
}

export async function deleteTasks(ids: string[]) {
  try {
    await Promise.all(ids.map((id) => sql`DELETE FROM tasks WHERE id = ${id}`));
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete tasks:", error);
    return { success: false };
  }
}

export async function updateTask(id: string, updates: Partial<Task>) {
  try {
    if (updates.title) {
      await sql`UPDATE tasks SET title = ${updates.title} WHERE id = ${id}`;
    }
    if (updates.status) {
      await sql`UPDATE tasks SET status = ${updates.status} WHERE id = ${id}`;
    }
    if (updates.priority) {
      await sql`UPDATE tasks SET priority = ${updates.priority} WHERE id = ${id}`;
    }
    if (updates.label) {
      await sql`UPDATE tasks SET label = ${updates.label} WHERE id = ${id}`;
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update task:", error);
    return { success: false, message: "Failed to update task" };
  }
}

export async function duplicateTask(id: string) {
  try {
    const { rows } = await sql`SELECT * FROM tasks WHERE id = ${id}`;
    if (rows.length === 0) {
      return { success: false, message: "Task not found" };
    }
    const task = rows[0];

    // Generate new ID with a slight offset to avoid collision if run very fast
    // Ideally we'd use UUIDs or sequence, but sticking to existing pattern
    const now = new Date();
    // add random millis to ensure uniqueness if needed, or strictly follow pattern
    const yy = now.getFullYear().toString().slice(-2);
    const mm = (now.getMonth() + 1).toString().padStart(2, "0");
    const dd = now.getDate().toString().padStart(2, "0");
    const hh = now.getHours().toString().padStart(2, "0");
    const min = now.getMinutes().toString().padStart(2, "0");
    const ss = now.getSeconds().toString().padStart(2, "0");
    const newId = `${yy}${mm}${dd}-${hh}${min}${ss}`;

    await sql`
      INSERT INTO tasks (id, title, status, label, priority)
      VALUES (${newId}, ${task.title}, ${task.status}, ${task.label}, ${task.priority})
    `;

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to duplicate task:", error);
    return { success: false, message: "Failed to duplicate task" };
  }
}
