import { useState } from "react";
import { useNavigate } from "react-router";
import { signIn, signUp } from "../services/auth";
import { getAuthErrorMessage } from "../utils/errors";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loadingSignIn, setLoadingSignIn] = useState(false);
    const [loadingSignUp, setLoadingSignUp] = useState(false);

    async function handleSignIn() {
        setError("");
        setLoadingSignIn(true);

        try {
            await signIn(email, password);
            navigate("/dashboard")
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
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-center text-slate-800">
                        Todo App
                    </h1>

                    <p className="mt-2 text-sm text-center text-slate-500">
                        Entre na sua conta ou crie uma nova.
                    </p>
                </div>

                <div className="flex flex-col gap-5">
                    <input
                        id="email"
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        id="password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />

                    {error && (
                        <p className="text-sm text-red-600 text-center">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={handleSignIn}
                            disabled={loadingSignIn || loadingSignUp}
                            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
                        >
                            {loadingSignIn ? "Entrando..." : "Entrar"}
                        </button>

                        <button
                            onClick={handleSignUp}
                            disabled={loadingSignIn || loadingSignUp}
                            className="w-full rounded-lg border border-blue-600 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
                        >
                            {loadingSignUp ? "Criando conta..." : "Criar conta"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
