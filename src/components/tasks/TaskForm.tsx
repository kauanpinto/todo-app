import { useState, type SubmitEvent } from "react";
import { createTask } from "../../services/tasks";
import { getTaskErrorMessage } from "../../utils/errors";
import type { Task } from "../../services/tasks";
import { Input, Button } from "../ui";

interface TaskFormProps {
    onCreated: (task: Task) => void;
}

function TaskForm({ onCreated }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-3">
                <Input
                    placeholder="Nova tarefa..."
                    value={title}
                    onChange={(value) => {
                        setTitle(value);
                        setError("");
                    }}
                />

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Criando..." : "Adicionar"}
                </Button>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
    );
}

export default TaskForm;