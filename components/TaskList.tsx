interface Task {
    id: number;
    text: string;
}

interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">{task.text}</h2>
                    <button
                        className="bg-red-500 w-52 text-white px-4 py-2 rounded-md"
                        onClick={() => onDeleteTask(task.id)}
                    >
                        Delete task
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
