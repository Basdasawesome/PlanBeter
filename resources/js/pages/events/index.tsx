import { Link } from '@inertiajs/react';
import { CalendarIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create } from '@/routes/events';
import { show } from '@/routes/events';
import type { Event } from '@/types';

export default function Index({ events }: { events: Event[] }) {
    return (
        <AppLayout title="Events">
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Your Events</h1>
                        <p className="text-muted-foreground">Plan and vote on dates with your friends.</p>
                    </div>
                    <Button asChild>
                        <Link href={create()}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Create Event
                        </Link>
                    </Button>
                </div>

                {events.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50">
                        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                <CalendarIcon className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h2 className="mt-6 text-xl font-semibold">No events created</h2>
                            <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
                                You don't have any events yet. Create one to start planning with your friends.
                            </p>
                            <Button asChild>
                                <Link href={create()}>Create Event</Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <Card key={event.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>{event.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {event.description || 'No description provided.'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {event.date_options?.length || 0} date options
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild variant="secondary" className="w-full">
                                        <Link href={show({ event: event.id })}>
                                            View Event
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
