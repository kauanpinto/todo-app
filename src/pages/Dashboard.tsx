import { useEffect, useState } from "react";
import { getTasks, editTask, toggleTask, deleteTask } from "../services/tasks";
import { getTaskErrorMessage } from "../utils/errors";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import type { Task } from "../services/tasks";

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        setError("");
        setLoading(true);
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError(getTaskErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }

    function handleTaskCreated(task: Task) {
        setTasks((prev) => [task, ...prev]);
    }

    async function handleEditTask(id: string, title: string) {
        try {
            const edited = await editTask(id, title);
            setTasks((prev) => prev.map((t) => (t.id === id ? edited : t)));
        } catch (err) {
            setError(getTaskErrorMessage(err));
        }
    }

    async function handleToggleTask(id: string, completed: boolean) {
        try {
            const updated = await toggleTask(id, completed);
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        } catch (err) {
            setError(getTaskErrorMessage(err));
        }
    }

    async function handleDeleteTask(id: string) {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            setError(getTaskErrorMessage(err));
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 px-4 py-10">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
                <h1 className="mb-6 text-3xl font-bold text-center text-slate-800">
                    Minhas Tarefas
                </h1>

                <TaskForm onCreated={handleTaskCreated} />

                {error && (
                    <p className="mt-4 text-sm text-center text-red-600">
                        {error}
                    </p>
                )}

                {loading ? (
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Carregando tarefas...
                    </p>
                ) : (
                    <TaskList
                        tasks={tasks}
                        onEdit={handleEditTask}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                    />
                )}
            </div>
        </div>
    );
}

export default Dashboard;
