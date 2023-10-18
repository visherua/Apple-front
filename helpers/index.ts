import { NextRouter } from 'next/router';

const getAllProjects = async (): Promise<object[]> => {
    const result = await fetch('https://nest-js-postgres.vercel.app/project', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
        },
    });
    const fetchedProjects = await result.json();
    return fetchedProjects;
};

const getProjectById = async (params: { id: string }): Promise<object[]> => {
    const result = await fetch(`https://nest-js-postgres.vercel.app/project/${params.id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
        },
    });
    const fetchedProject = await result.json();
    return fetchedProject;
};

const createProject = async ({
    projectComments, tasks, projectName, router, setErrors
}: {
    projectComments: any[];
    tasks: any[];
    projectName: string;
    router: NextRouter;
    setErrors: (errors: any) => void;
}): Promise<void> => {
    if (!projectName) {
        setErrors([{ message: 'Please fill name field' }]);
        return;
    }
    const comments = JSON.stringify(projectComments);
    const updatedTasks = JSON.stringify(tasks);
    await fetch(`https://nest-js-postgres.vercel.app/project`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
        },
        body: JSON.stringify({
            comment: comments,
            tasks: updatedTasks,
            name: projectName,
        }),
    });
    router.push(`/projects`);
};

const updateProjects = async ({
    projectComments,
    tasks,
    params,
    router,
}: {
    projectComments: string[] | null;
    tasks: { id: number, text: string }[];
    params: { id: string };
    router: NextRouter;
}): Promise<void> => {
    let comments = '[]';
    if (projectComments) {
        comments = JSON.stringify(projectComments);
    }
    const updatedTasks = JSON.stringify(tasks);
    await fetch(`https://nest-js-postgres.vercel.app/project/${params.id}`, {
        method: 'put',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
        },
        body: JSON.stringify({
            comment: comments,
            tasks: updatedTasks,
        }),
    });
    router.push('/projects');
};

export { createProject, getAllProjects, updateProjects, getProjectById };
