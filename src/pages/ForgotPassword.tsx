import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import { Input, Card, Button, Layout } from "../components/ui";
import { getAuthErrorMessage } from "../utils/errors";
import { requestPasswordReset } from "../services/auth";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await requestPasswordReset(email);
            setSent(true);
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }

    if (sent) {
        return (
            <Layout>
                <Card>
                    <div className="p-2 text-center">
                        <h1 className="text-base text-center mb-4 mt-2 font-semibold text-slate-800">
                            Link de recuperação enviado!
                        </h1>
                        <p className="text-slate-700 text-sm">
                            Se esse email existir, enviamos um link de
                            recuperação. Confira sua caixa de entrada.
                        </p>
                        <Link
                            to="/login"
                            className="mt-4 inline-block text-sm text-blue-600 hover:underline"
                        >
                            Voltar para a tela de login
                        </Link>
                    </div>
                </Card>
            </Layout>
        );
    }

    return (
        <Layout>
            <Card>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-xl text-center mb-4 mt-2 font-semibold text-slate-800">
                        Recuperar senha
                    </h1>

                    <div className="flex flex-col gap-4">
                        <Input
                            type="email"
                            value={email}
                            onChange={(value) => {
                                setEmail(value);
                                setError("");
                            }}
                            placeholder="Digite seu e-mail"
                        />

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        <Button type="submit" disabled={loading}>
                            {loading
                                ? "Enviando..."
                                : "Enviar link de recuperação"}
                        </Button>

                        <Link
                            to="/login"
                            className="text-center text-sm text-slate-500 hover:underline"
                        >
                            Voltar para a tela de login
                        </Link>
                    </div>
                </form>
            </Card>
        </Layout>
    );
}

export default ForgotPassword;
