import { supabase } from "../lib/supabase";

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

export async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function requestPasswordReset(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
}

export async function requestPasswordChange(): Promise<void> {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) throw new Error("Usuário não encontrado");

    await requestPasswordReset(user.email);
}

export async function updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
}

export async function deleteAccount(): Promise<void> {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`,
        {
            method: "POST",
            headers: { Authorization: `Bearer ${session?.access_token}` },
        },
    );

    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao excluir conta");
    }

    await signOut();
}
