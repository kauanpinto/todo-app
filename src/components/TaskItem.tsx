import { useState } from "react";
import type { Task } from "../services/tasks";
import { X, Check } from "lucide-react";

interface TaskItemProps {
    task: Task;
    onEdit: (id: string, title: string) => void;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

function TaskItem({ task, onEdit, onToggle, onDelete }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(task.title);

    function handleSave() {
        const trimmed = draft.trim();
        if (trimmed && trimmed !== task.title) onEdit(task.id, trimmed);
        
        setIsEditing(false);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") handleSave();
        
        if (e.key === "Escape") {
            setDraft(task.title);
            setIsEditing(false);
        }
    }

    return (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="flex flex-1 items-center gap-3 min-w-0">
                <Check
                    type="button"
                    onClick={() => onToggle(task.id, !task.completed)}
                    className={`h-7 w-7 shrink-0 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                        task.completed
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-slate-300 bg-white text-transparent"
                    }`}
                />

                {isEditing ? (
                    <input
                        autoFocus
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleSave}
                        className="flex-1 min-w-0 border-b border-blue-400 bg-transparent text-slate-800 outline-none"
                    />
                ) : (
                    <span
                        onClick={() => setIsEditing(true)}
                        className={
                            (task.completed
                                ? "text-slate-400 line-through"
                                : "text-slate-800") + " break-all cursor-text"
                        }
                    >
                        {task.title}
                    </span>
                )}
            </div>

            <X
                onClick={() => onDelete(task.id)}
                className="flex-shrink-0 bg-red-600 border-2 border-red-600 rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium text-white transition hover:bg-red-700"
            />
        </div>
    );
}

export default TaskItem;