import { useState, ChangeEvent } from 'react';

interface ProjectCommentFormProps {
    onAddComment: (comment: string) => void;
}

const ProjectCommentForm: React.FC<ProjectCommentFormProps> = ({ onAddComment }) => {
    const [comment, setComment] = useState<string>('');

    const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleAddComment = () => {
        if (comment.trim() !== '') {
            onAddComment(comment);
            setComment('');
        }
    };

    return (
        <div className="mt-4 flex items-baseline">
            <input
                type="text"
                placeholder="Add comment to project..."
                className="w-full p-2 border rounded-md"
                value={comment}
                onChange={handleCommentChange}
            />
            <button
                className="bg-blue-500 w-52 text-white px-4 py-2 rounded-md mt-2 ml-5"
                onClick={handleAddComment}
            >
                Add
            </button>
        </div>
    );
};

export default ProjectCommentForm;
