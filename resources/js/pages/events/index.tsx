import { Link, router } from '@inertiajs/react';
import { AwardIcon, CalendarIcon, PlusIcon, RepeatIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { create, show, destroy } from '@/routes/events';
import type { DateOption, Event } from '@/types';

export default function Index({ events }: { events: (Event & { fristOption: DateOption; lastOption: DateOption })[] }) {
    const deleteEvent = (id: number) => {
        router.delete(destroy(id));
    };

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
                            <Card key={event.id} className="flex flex-col relative group">
                                <button type="button" onClick={() => deleteEvent(event.id)} className="absolute top-4 right-4">
                                    <TrashIcon className="size-4 text-destructive hover:text-destructive/80 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </button>
                                <CardHeader>
                                    <CardTitle>{event.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {event.description || 'No description provided.'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-2">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <CalendarIcon className="mr-2 size-4" />
                                        {new Date(event.fristOption.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} - {new Date(event.lastOption.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                                    </div>
                                    {event.selected && (
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <AwardIcon className="mr-2 size-4" />
                                            {new Date(event.selected.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                                        </div>
                                    )}
                                    {event.recurrence_type && (
                                        <div className="flex items-center text-sm text-muted-foreground capitalize">
                                            <RepeatIcon className="mr-2 size-4" />
                                            {event.recurrence_type}
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
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
