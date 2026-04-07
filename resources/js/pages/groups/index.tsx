import { Link } from '@inertiajs/react';
import { CalendarIcon, PlusIcon, Users2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create } from '@/routes/groups';
import { show } from '@/routes/groups';
import { edit } from '@/routes/groups';
import type { Group } from '@/types';

export default function GroupsIndex({ groups }: { groups: Group[] }) {
    return (
        <AppLayout title="groups">
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Your groups</h1>
                        <p className="text-muted-foreground">Create a group to plan repeating events</p>
                    </div>
                    <Button asChild>
                        <Link href={create()}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Create Group
                        </Link>
                    </Button>
                </div>

                {groups.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50">
                        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                <Users2Icon className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h2 className="mt-6 text-xl font-semibold">No groups created</h2>
                            <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
                                You don't have any groups yet. Create one to start planning with your friends.
                            </p>
                            <Button asChild>
                                <Link href={create()}>Create Group</Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {groups.map((group) => (
                            <Card key={group.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>{group.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {group.users?.length || 0} members
                                    </div>
                                </CardContent>
                                <CardFooter className='gap-2'>
                                    <Button asChild variant="secondary" className="w-full">
                                        <Link href={show({ group: group.id })}>
                                            View Group
                                        </Link>
                                    </Button>
                                    <Button asChild variant="secondary" className="w-full">
                                        <Link href={edit(group.id)}>
                                             Edit Group
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
