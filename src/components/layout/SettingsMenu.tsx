import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
    signOut,
    requestPasswordChange,
    deleteAccount,
} from "../../services/auth";
import { Button } from "../ui";
import { getAuthErrorMessage } from "../../utils/errors";
import { Settings } from "lucide-react";

function SettingsMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [passwordSent, setPasswordSent] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);
    const [error, setError] = useState("");
    const { session } = useAuth();

    async function handleLogout() {
        await signOut();
    }

    async function handleChangePassword() {
        setLoadingAction(true);
        setError("");

        try {
            await requestPasswordChange();
            setPasswordSent(true);
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setLoadingAction(false);
        }
    }

    async function handleDeleteAccount() {
        setLoadingAction(true);
        setError("");

        try {
            await deleteAccount();
        } catch (err) {
            setError(getAuthErrorMessage(err));
        } finally {
            setLoadingAction(false);
        }
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="h-8 w-8 flex items-center justify-center text-black transition-all active:scale-95"
            >
                <Settings
                    className={`h-7 w-7 transition-transform duration-300 ${
                        isOpen ? "rotate-90" : "rotate-0"
                    }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white shadow-lg p-4 flex flex-col gap-2 z-10 animate-dropdown">
                    <p className="text-sm text-slate-500 break-all leading-6 text-center mb-2">
                        <strong className="text-base">Sessão atual</strong> <br />
                        {session?.user.email}
                    </p>

                    {error && (
                        <p className="text-xs text-red-600 text-center">
                            {error}
                        </p>
                    )}

                    {passwordSent ? (
                        <p className="text-xs text-slate-500">
                            Enviamos um link para{" "}
                            <strong>{session?.user.email}</strong>
                        </p>
                    ) : (
                        <Button
                            variant="outline"
                            color="neutral"
                            size="sm"
                            onClick={handleChangePassword}
                            disabled={loadingAction}
                        >
                            {loadingAction ? "Enviando..." : "Trocar senha"}
                        </Button>
                    )}

                    <Button color="danger" size="sm" onClick={handleLogout}>
                        Sair
                    </Button>

                    {confirmDelete ? (
                        <div className="flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 p-2">
                            <p className="text-xs text-red-700">
                                Essa ação é permanente. Confirma a exclusão?
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="solid"
                                    color="danger"
                                    size="xs"
                                    onClick={handleDeleteAccount}
                                    disabled={loadingAction}
                                >
                                    {loadingAction
                                        ? "Excluindo..."
                                        : "Confirmar"}
                                </Button>
                                <Button
                                    variant="solid"
                                    color="neutral"
                                    size="xs"
                                    onClick={() => setConfirmDelete(false)}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            color="danger"
                            size="sm"
                            onClick={() => setConfirmDelete(true)}
                        >
                            Excluir conta
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default SettingsMenu;
