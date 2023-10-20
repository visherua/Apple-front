import { useEffect, useState } from 'react';
import TaskForm from '../../../../components/TaskForm';
import TaskList from '../../../../components/TaskList';
import ProjectCommentForm from '../../../../components/ProjectCommentForm';
import Link from 'next/link'
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getProjectById, updateProjects } from '../../../../helpers';

interface Task {
    id: number;
    text: string;
}

interface Project {
    comment: string;
    tasks: string;
    name: string;
}

interface HomeProps {
    project: Project[] | null;
    params: any;
}

const Home: React.FC<HomeProps> = ({ project, params }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projectName, setName] = useState<string>('');
    const [projectComments, setProjectComments] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (project) {
            const { comment, tasks, name } = project[0];
            const commentsForUpdate = JSON.parse(comment);
            const tasksForUpdate = JSON.parse(tasks);
            setTasks(tasksForUpdate);
            setProjectComments(commentsForUpdate);
            setName(name);
        }
    }, [project]);

    const addTask = (text: string) => {
        setTasks([...tasks, { id: tasks.length + 1, text }]);
    };

    const deleteTask = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const addProjectComment = (comment: string) => {
        setProjectComments([...projectComments, comment]);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{projectName}</h1>
            <TaskForm onAddTask={addTask} />
            <TaskList tasks={tasks} onDeleteTask={deleteTask} />
            <h2 className="text-xl font-semibold mb-2 mt-4">Comments for project:</h2>
            <ProjectCommentForm onAddComment={addProjectComment} />
            <ul>
                {projectComments?.map((comment, index) => (
                    <li key={index} className="mb-2">
                        {comment}
                    </li>
                ))}
            </ul>
            <button className="bg-purple-700 mr-10 w-52 text-white px-4 py-2 rounded-md mt-2"
                onClick={() => updateProjects({ projectComments, tasks, params, router })}>Save updates</button>
            <Link href='/projects'>
                <button className="bg-green-500 w-52 text-white px-4 py-2 rounded-md mt-2">
                    Back
                </button>
            </Link>
        </div>
    );
};

export async function getServerSideProps({ params, req }) {
    const session = await getSession({ req: req });
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    const fetchedProject = await getProjectById(params)
    return { props: { project: fetchedProject, params } };
}

export default Home;
