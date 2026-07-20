import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { setLanguage, translateErrorCode } from 'supabase-error-translator-js';

setLanguage('auto');

function isPostgrestError(err: unknown): err is PostgrestError {
    return typeof err === "object" && err !== null && "code" in err && "message" in err;
}

export function getAuthErrorMessage(err: unknown): string {
    if (err instanceof AuthError && err.code) return translateErrorCode(err.code, 'auth');
    
    return "Erro inesperado. Tente novamente.";
}

export function getTaskErrorMessage(err: unknown): string {
    if (isPostgrestError(err)) return translateErrorCode(err.code, 'database');
    
    if (err instanceof Error) return err.message;
    
    return "Erro inesperado ao processar a tarefa.";
}