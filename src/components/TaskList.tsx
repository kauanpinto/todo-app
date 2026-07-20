import TaskItem from "./TaskItem";
import type { Task } from "../services/tasks";

interface TaskListProps {
    tasks: Task[];
    onEdit: (id: string, title: string) => void;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

function TaskList({ tasks, onEdit, onToggle, onDelete }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <p className="mt-6 text-center text-sm text-slate-500">
                Nenhuma tarefa por aqui ainda.
            </p>
        );
    }

    return (
        <div className="mt-6 flex flex-col gap-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default TaskList;
