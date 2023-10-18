import { useState, ChangeEvent } from 'react';

interface TaskFormProps {
    onAddTask: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [taskText, setTaskText] = useState<string>('');

    const handleTaskTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskText(e.target.value);
    };

    const handleAddTask = () => {
        if (taskText.trim() !== '') {
            onAddTask(taskText);
            setTaskText('');
        }
    };

    return (
        <div className="mt-4 flex items-baseline">
            <input
                type="text"
                placeholder="Add task..."
                className="w-full p-2 border rounded-md"
                value={taskText}
                onChange={handleTaskTextChange}
            />
            <button
                className="bg-green-500 w-52 text-white px-4 py-2 rounded-md mt-2 ml-5"
                onClick={handleAddTask}
            >
                Add
            </button>
        </div>
    );
};

export default TaskForm;
