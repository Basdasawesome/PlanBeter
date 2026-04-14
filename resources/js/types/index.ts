import type { User } from './auth';

export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type Event = {
    id: number;
    public_id: string | null;
    title: string;
    description: string | null;
    created_by: User;
    created_at: string;
    date_options: DateOption[];
};

export type DateOption = {
    id: number;
    date: string;
    starts_at: string | null;
    ends_at: string | null;
    availabilities: Availability[];
};

export type Availability = {
    id: number;
    user_id: number;
    status: 'yes' | 'maybe' | 'no';

    user: User;
};

export type Group = {
    id: number;
    name: string;
    created_at: string;

    users: (User & {
        pivot: {
            role: string;
        }
    })[] ;
    pivot: {
            role: string;
        }
};

export type Roles = string[];
