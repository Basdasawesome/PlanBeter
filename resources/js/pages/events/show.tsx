import { router, useForm, usePage } from '@inertiajs/react';
import { CheckIcon, HelpCircleIcon, XIcon } from 'lucide-react';
import ShareDialog from '@/components/ShareDialog';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import AppLayout from '@/layouts/app-layout';
import { update } from '@/routes/events/availability';
import type { Event } from '@/types';
import type { Auth } from '@/types/auth';

type AvailabilityFormStatus = '' | 'yes' | 'maybe' | 'no';

export default function EventsShow({ event }: { event: Event }) {
    const auth = usePage().props.auth as Auth;
    const user = auth.user;

    function updateAvailability(dateOptionId: number, newStatus: AvailabilityFormStatus): void {
        router.post(update.url({ event: event.id }), {
            date_option_id: dateOptionId, status: newStatus,
        });
    }

    function getUsersWhoVoted(): Array<(typeof user)> {
        const usersById = new Map<number, (typeof user)>();

        for (const option of event.date_options) {
            for (const availability of option.availabilities) {
                usersById.set(availability.user_id, availability.user);
            }
        }

        return Array.from(usersById.values()).sort((a, b) => a.name.localeCompare(b.name));
    }

    const usersWhoVoted = getUsersWhoVoted();

    return (
        <AppLayout title={event.title}>
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6 max-w-5xl mx-auto w-full">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
                        {event.description && (
                            <p className="text-muted-foreground">{event.description}</p>
                        )}
                        <p className="text-sm text-muted-foreground">
                            Created by {event.created_by.name}
                        </p>
                    </div>
                    <ShareDialog event={event} />
                </div>

                <div className="bg-card border rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Participants</th>
                                    {event.date_options.map(option => (
                                        <th key={option.id} className="px-6 py-4 font-medium text-center min-w-[150px]">
                                            <div className="font-semibold text-foreground">
                                                {new Date(option.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </div>
                                            {(option.starts_at || option.ends_at) && (
                                                <div className="text-xs mt-1">
                                                    {option.starts_at && option.starts_at.substring(0, 5)}
                                                    {option.ends_at && ` - ${option.ends_at.substring(0, 5)}`}
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {/* Other users' votes */}
                                {usersWhoVoted.map(u => {
                                    if (u?.id === user.id) {
                                        return null;
                                    }

                                    return (
                                        <tr key={u?.id} className="bg-card">
                                            <td className="px-6 py-4 font-medium">{u?.name}</td>
                                            {event.date_options.map(option => {
                                                const vote = option.availabilities.find(a => a.user_id === u?.id);

                                                return (
                                                    <td key={option.id} className="px-6 py-4 text-center">
                                                        {vote?.status === 'yes' && <CheckIcon className="mx-auto h-5 w-5 text-green-500" />}
                                                        {vote?.status === 'maybe' && <HelpCircleIcon className="mx-auto h-5 w-5 text-yellow-500" />}
                                                        {vote?.status === 'no' && <XIcon className="mx-auto h-5 w-5 text-red-500" />}
                                                        {!vote && <span className="text-muted-foreground">-</span>}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}

                                {/* Current user's voting row */}
                                <tr className="bg-muted/20">
                                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                                        {user.name} <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">You</span>
                                    </td>
                                    {event.date_options.map(option => {
                                        const currentVote = option.availabilities.find(a => a.user_id === user.id)?.status ?? '';

                                        return (
                                            <td key={option.id} className="px-6 py-4 text-center">
                                                <ToggleGroup
                                                    type="single"
                                                    value={currentVote}
                                                    onValueChange={(value) => {
                                                        updateAvailability(option.id, (value ?? '') as AvailabilityFormStatus);
                                                    }}
                                                    className="justify-center"
                                                >
                                                    <ToggleGroupItem value="yes" aria-label="Yes" className="data-[state=on]:bg-success/80 data-[state=on]:text-success-foreground hover:bg-success/60 hover:text-success-foreground">
                                                        <CheckIcon className="h-4 w-4" />
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem value="maybe" aria-label="Maybe" className="data-[state=on]:bg-warning/80 data-[state=on]:text-warning-foreground hover:bg-warning/60 hover:text-warning-foreground">
                                                        <HelpCircleIcon className="h-4 w-4" />
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem value="no" aria-label="No" className="data-[state=on]:bg-destructive/80 data-[state=on]:text-destructive-foreground hover:bg-destructive/60 hover:text-destructive-foreground">
                                                        <XIcon className="h-4 w-4" />
                                                    </ToggleGroupItem>
                                                </ToggleGroup>
                                            </td>
                                        );
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
