import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { updatePassword } from "../services/auth";
import { getAuthErrorMessage } from "../utils/errors";
import { PasswordInput, Button, Card, Layout } from "../components/ui";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

        if (!passwordRegex.test(password)) {
            setError(
                "A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.",
            );
            return;
        }

        setLoading(true);
        try {
            await updatePassword(password);
            navigate("/dashboard", { replace: true });
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout>
            <Card>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-xl text-center mb-4 mt-2 font-semibold text-slate-800">
                        Definir nova senha
                    </h1>

                    <div className="flex flex-col gap-4">
                        <PasswordInput
                            value={password}
                            onChange={(value) => {
                                setPassword(value);
                                setError("");
                            }}
                            placeholder="Nova senha"
                        />

                        <ul className="list-disc pl-5 text-sm text-slate-600">
                            <li>Pelo menos 8 caracteres</li>
                            <li>1 letra maiúscula e 1 minúscula</li>
                            <li>1 número</li>
                            <li>
                                1 caractere especial (ex.: !, @, #, $, %, &, *)
                            </li>
                        </ul>

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        <Button type="submit" disabled={loading}>
                            {loading ? "Salvando..." : "Salvar nova senha"}
                        </Button>
                    </div>
                </form>
            </Card>
        </Layout>
    );
}

export default ResetPassword;
