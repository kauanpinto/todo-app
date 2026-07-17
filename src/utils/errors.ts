import { AuthError } from "@supabase/supabase-js";
import { setLanguage, translateErrorCode } from 'supabase-error-translator-js';

setLanguage('auto');

export function getAuthErrorMessage(err: unknown): string {
    if (err instanceof AuthError && err.code) {
        return translateErrorCode(err.code, 'auth');
    }
    
    return "Erro inesperado. Tente novamente.";
}