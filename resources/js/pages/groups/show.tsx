import { Button } from '@headlessui/react';
import { Link } from 'lucide-react';
import { edit } from '@/actions/App/Http/Controllers/GroupController';
import AppLayout from '@/layouts/app-layout';
import type { Group } from '@/types';

export default function GroupsShow({ group }: { group: Group }) {

    return (
        <AppLayout title={group.name}>
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6 max-w-5xl mx-auto w-full">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
                </div>
            </div>
                <Button asChild variant="secondary" className="w-full">
                    <Link href={edit({ group: group.id })}>
                         Edit Group
                    </Link>
                </Button>
        </AppLayout>
    );
}
