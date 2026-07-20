import { useState } from "react";
import { createTask } from "../services/tasks";
import { getTaskErrorMessage } from "../utils/errors";
import type { Task } from "../services/tasks";

interface TaskFormProps {
    onCreated: (task: Task) => void;
}

function TaskForm({ onCreated }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        if (!title.trim()) return;

        setError("");
        setLoading(true);

        try {
            const task = await createTask(title.trim());
            onCreated(task);
            setTitle("");
        } catch (err) {
            setError(getTaskErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Nova tarefa..."
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setError("");
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                    }}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="shrink-0 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Criando..." : "Adicionar"}
                </button>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}

export default TaskForm;
