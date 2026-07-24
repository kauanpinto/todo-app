import { AuthError, PostgrestError } from "@supabase/supabase-js";

function isPostgrestError(err: unknown): err is PostgrestError {
    return (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        "message" in err
    );
}

const authMessages: Record<string, string> = {
    invalid_credentials: "E-mail ou senha incorretos.",
    email_not_confirmed: "Confirme seu e-mail antes de entrar.",
    user_already_exists: "Já existe uma conta com esse e-mail.",
    weak_password:
        "Senha muito fraca. Use ao menos 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.",
    user_not_found: "Não encontramos uma conta com esse e-mail.",
    email_address_invalid: "Digite um e-mail válido.",
    over_request_rate_limit:
        "Muitas tentativas. Aguarde um pouco antes de tentar de novo.",
    session_expired: "Sua sessão expirou. Faça login novamente.",
    same_password: "A nova senha não pode ser igual à anterior.",
};

export function getAuthErrorMessage(err: unknown): string {
    if (err instanceof AuthError && err.code) {
        return (
            authMessages[err.code] ??
            "Não foi possível concluir a autenticação. Tente novamente."
        );
    }
    return "Erro inesperado. Tente novamente.";
}

const dbMessages: Record<string, string> = {
    "23505": "Já existe um registro com esses dados.",
    "23503":
        "Esse registro está vinculado a outro e não pode ser alterado/excluído.",
    "23502": "Preencha todos os campos obrigatórios.",
    "22P02": "Formato de dado inválido.",
    "42501": "Você não tem permissão para fazer isso.",
    PGRST116: "Registro não encontrado.",
};

export function getTaskErrorMessage(err: unknown): string {
    if (isPostgrestError(err)) {
        return (
            dbMessages[err.code] ??
            "Não foi possível processar a tarefa. Tente novamente."
        );
    }
    if (err instanceof Error) return err.message;
    return "Erro inesperado ao processar a tarefa.";
}
