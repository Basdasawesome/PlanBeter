import { Link, router, usePage } from '@inertiajs/react';
import { CheckIcon, EditIcon, HelpCircleIcon, XIcon, ArrowRight } from 'lucide-react';
import ShareDialog from '@/components/ShareDialog';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import AppLayout from '@/layouts/app-layout';
import { edit, overview } from '@/routes/events';
import { update } from '@/routes/events/availability';
import type { Event } from '@/types';
import type { Auth } from '@/types/auth';

type AvailabilityFormStatus = '' | 'yes' | 'maybe' | 'no';

export default function Show({ event }: { event: Event }) {
    const auth = usePage().props.auth as Auth;
    const user = auth.user;

    function updateAvailability(dateOptionId: number, newStatus: AvailabilityFormStatus): void {
        router.post(update.url({ event: event.id }), {
            date_option_id: dateOptionId, status: newStatus,
        });
    }

    event.date_options.map(option => (
        console.log(option)
    ));

    return (
        <AppLayout title={event.title}>
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6 max-w-3xl mx-auto w-full">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
                        {event.description && (
                            <p className="text-muted-foreground">{event.description}</p>
                        )}
                        <p className="text-sm text-muted-foreground">
                            Participant: {user.name}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                    <ShareDialog event={event} />
                    <Button asChild>
                        <Link href={edit(event.id)}>
                            <EditIcon className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                    </div>
                </div>
                <div>
                    {event.date_options.map(option => {
                        const currentVote = option.availabilities.find(a => a.user_id === user.id)?.status;
                        const test = new Date(option.date).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

                        return (
                            <div className="rounded-lg bg-background border-2 border-grey px-4 py-2 mb-2 flex items-center justify-between">
                                <p className="font-semibold capitalize">{test}</p>
                                <ToggleGroup
                                    type="single"
                                    value={currentVote}
                                    onValueChange={(value) => {
                                        updateAvailability(option.id, (value ?? '') as AvailabilityFormStatus);
                                    }}
                                    className=""
                                >

                                    <ToggleGroupItem value="yes" aria-label="Yes" className="data-[state=on]:bg-green-100 data-[state=on]:text-green-700 dark:data-[state=on]:bg-green-900/30 dark:data-[state=on]:text-green-400 rounded-lg mx-1">
                                        Ja<CheckIcon className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="maybe" aria-label="Maybe" className="data-[state=on]:bg-yellow-100 data-[state=on]:text-yellow-700 dark:data-[state=on]:bg-yellow-900/30 dark:data-[state=on]:text-yellow-400 rounded-lg mx-1">
                                        Misschien<HelpCircleIcon className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="no" aria-label="No" className="data-[state=on]:bg-red-100 data-[state=on]:text-red-700 dark:data-[state=on]:bg-red-900/30 dark:data-[state=on]:text-red-400 rounded-lg mx-1">
                                        Nee<XIcon className="h-4 w-4" />
                                    </ToggleGroupItem>

                                </ToggleGroup>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-end items-center">
                    <Button asChild className="border-2 border-gray bg-primary px-4 py-2 rounded-lg flex flex-row items-center text-white">
                        <Link href={overview(event)}>
                            Volgende <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </AppLayout >
    );
}
