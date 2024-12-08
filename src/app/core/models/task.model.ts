export interface Task {
    id: string;
    name: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Pending' | 'In Progress' | 'Completed';
    assignedTo: string;
    dueDate: Date;
}
