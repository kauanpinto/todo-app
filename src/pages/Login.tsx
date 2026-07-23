import { useState, type SubmitEvent } from "react";
import { useNavigate, Link } from "react-router";
import { signIn, signUp } from "../services/auth";
import { getAuthErrorMessage } from "../utils/errors";
import { Input, Button, PasswordInput, Card, Layout } from "../components/ui";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loadingSignIn, setLoadingSignIn] = useState(false);
    const [loadingSignUp, setLoadingSignUp] = useState(false);

    async function handleSignIn(e: SubmitEvent<HTMLFormElement>) {
        setError("");
        setLoadingSignIn(true);
        e.preventDefault();

        try {
            await signIn(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setLoadingSignIn(false);
        }
    }

    async function handleSignUp() {
        setError("");
        setLoadingSignUp(true);

        try {
            await signUp(email, password);
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setLoadingSignUp(false);
        }
    }

    return (
        <Layout>
            <Card>
                <form onSubmit={handleSignIn}>
                    <div className="mb-8 mt-2">
                        <h1 className="text-3xl font-bold text-center text-slate-800">
                            Todo App
                        </h1>

                        <p className="mt-2 text-sm text-center text-slate-500">
                            Entre na sua conta ou crie uma nova.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <Input
                            type="email"
                            value={email}
                            onChange={(value) => {
                                setEmail(value);
                                setError("");
                            }}
                            placeholder="Digite seu e-mail"
                        />

                        <PasswordInput
                            value={password}
                            onChange={(value) => {
                                setPassword(value);
                                setError("");
                            }}
                        />

                        {error && (
                            <p className="text-sm text-red-600 text-center">
                                {error}
                            </p>
                        )}

                        <div className="flex flex-col items-center gap-3 sm:flex-row">
                            <Button
                                type="submit"
                                disabled={loadingSignIn || loadingSignUp}
                            >
                                {loadingSignIn ? "Entrando..." : "Entrar"}
                            </Button>

                            <Button
                                variant="outline"
                                color="primary"
                                onClick={handleSignUp}
                                disabled={loadingSignIn || loadingSignUp}
                            >
                                {loadingSignUp
                                    ? "Criando conta..."
                                    : "Criar conta"}
                            </Button>
                        </div>

                        <div className="flex justify-center text-sm gap-2 mt-1">
                            <p className="text-slate-600">
                                Esqueceu a senha?
                            </p>

                            <Link
                                to="/forgot-password"
                                className="text-blue-600 hover:underline"
                            >
                                Clique aqui
                            </Link>
                        </div>
                    </div>
                </form>
            </Card>
        </Layout>
    );
}

export default Login;
