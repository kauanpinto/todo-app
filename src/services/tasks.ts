import { supabase } from "../lib/supabase";
import type { Database } from "../lib/database.types";

export type Task = Database["public"]["Tables"]["tasks"]["Row"];

export async function getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}

export async function createTask(title: string): Promise<Task> {
    const { data: userData, error: useError} = await supabase.auth.getUser();
    if (useError) throw useError;
    
    const { data, error } = await supabase
        .from("tasks")
        .insert({ title, user_id: userData.user.id })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function editTask(id: string, title: string): Promise<Task> {
    const { data, error } = await supabase
        .from("tasks")
        .update({ title })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function toggleTask(id: string, completed: boolean): Promise<Task> {
    const { data, error } = await supabase
        .from("tasks")
        .update({ completed })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteTask(id: string): Promise<void> {
    const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

    if (error) throw error;
}