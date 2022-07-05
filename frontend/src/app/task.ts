export interface Task {
    code: number,
    title: string,
    description?: string,
    start_date: string,
    due_date: string,
    status: string,
    user: string
}

export const tasks = [
    {
        code: 0,
        title: "Tarea #1",
        description: "Descripción de la tarea #1",
        start_date: "2022-07-03",
        due_date: "2022-07-05",
        status: "PENDIENTE",
        user: "usuario@email.com"
    },
    {
        code: 1,
        title: "Tarea #2",
        start_date: "2022-07-08",
        due_date: "2022-07-10",
        status: "FINALIZADA",
        user: "usuario@email.com"
    },
    {
        code: 2,
        title: "Tarea #3",
        start_date: "2022-07-04",
        due_date: "2022-07-06",
        status: "ATRASADA",
        user: "usuario@email.com"
    }
];