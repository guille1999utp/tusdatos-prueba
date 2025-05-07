export interface IEvents {
    id: number;
    title: string;
    description: string;
    capacity: number;
    date: string;
    state: 'scheduled' | 'completed' | 'canceled';
    registered_count: number;
}