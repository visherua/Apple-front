import { useState } from 'react';
import TaskForm from '../../../../components/TaskForm';
import TaskList from '../../../../components/TaskList';
import ProjectCommentForm from '../../../../components/ProjectCommentForm';
import { useRouter } from 'next/router';
import { createProject } from '../../../../helpers/index';
import ProjectNameForm from '../../../../components/NameForm';
import Link from 'next/link'
import { getSession } from 'next-auth/react';

interface Task {
    id: number;
    text: string;
}

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projectName, setName] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const [projectComments, setProjectComments] = useState<string[]>([]);
    const router = useRouter();
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
    const addProjectName = (name: string) => {
        setName(name)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create a new project</h1>
            <input type='text' onChange={(e) => setName(e.target.value)}></input>
            <ProjectNameForm onAddName={addProjectName} setErrors={setErrors} />
            <TaskForm onAddTask={addTask} />
            <TaskList tasks={tasks} onDeleteTask={deleteTask} />
            <h2 className="text-xl font-semibold mb-2 mt-4">Comments for the project:</h2>
            <ProjectCommentForm onAddComment={addProjectComment} />
            <ul>
                {projectComments.map((comment, index) => (
                    <li key={index} className="mb-2">
                        {comment}
                    </li>
                ))}
            </ul>
            <button className="bg-purple-700 mr-10 w-52 text-white px-4 py-2 rounded-md mt-2"
                onClick={() => createProject({ projectComments, tasks, projectName, router, setErrors })}>Add project</button>
            <Link legacyBehavior href='/projects'>
                <button className="bg-green-500 w-52 text-white px-4 py-2 rounded-md mt-2">
                    Back
                </button>
            </Link>
            {errors?.map((item: any) => <li key={item.id}>{item.message}</li>)} {/* Added 'key' attribute for mapping errors */}
        </div>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    return {
        props: {},
    }
}

export default Home;
