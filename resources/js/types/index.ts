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
    group_id: number | null;
    recurrence_type: string | null;
    recurrence_ends_at: string | null;
    recurrence_last_duplicated_at: string | null;
    recurring_events_count: number;
    created_at: string;
    date_options: DateOption[];

    selected: DateOption | null;
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

    users: User[];
};