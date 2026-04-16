import { PencilIcon, PlusCircleIcon, XCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { Event, Group } from '@/types';

type EventFormData = {
    title: string;
    description: string;
    group_id: number | null;
    recurrence_type: string | null;
    recurrence_ends_at: string | null;
    date_options: Array<{
        date: Date;
        starts_at: string | null;
        ends_at: string | null;
    }>;
};

type ConfirmDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    processing: boolean;
    event: Event;
    data: EventFormData;
    groups: Group[];
    onConfirm: () => void;
};

export default function ConfirmDialog({ open, onOpenChange, processing, event, data, groups, onConfirm }: ConfirmDialogProps) {

    const deletedDateOptions = event.date_options.filter((option) => !data.date_options.some((d) => d.date.getTime() === new Date(option.date).getTime()));
    const addedDateOptions = data.date_options.filter((option) => !event.date_options.some((d) => new Date(d.date).getTime() === option.date.getTime()));
    const updatedDateOptions = data.date_options.filter((option) => event.date_options.some((d) => new Date(d.date).getTime() === option.date.getTime() && (d.starts_at !== option.starts_at || d.ends_at !== option.ends_at)));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-fit">
                <DialogHeader>
                    <DialogTitle>Review changes</DialogTitle>
                    <DialogDescription>
                        Confirm the updates below before saving your event.
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[80vh]">

                    <div className="space-y-4">
                        {event.title !== data.title.trim() && (
                            <div>
                                <p>Title</p>
                                <p ><span className="line-through  decoration-destructive decoration-2">{event.title}</span> → {data.title.trim()}</p>
                            </div>
                        )}

                        {event.description && event.description !== data.description.trim() && (
                            <div>
                                <p>Description</p>
                                <p><span className="line-through  decoration-destructive decoration-2">{event.description}</span> → {data.description.trim()}</p>
                            </div>
                        )}

                        {event.group_id !== data.group_id && (
                            <div>
                                <p>Group</p>
                                <p><span className="line-through  decoration-destructive decoration-2">{groups.find((group) => group.id === event.group_id)?.name ?? "No group"}</span> → {groups.find((group) => group.id === data.group_id)?.name ?? "No group"}</p>
                            </div>
                        )}

                        {event.recurrence_type !== data.recurrence_type && (
                            <div>
                                <p>Recurrence type</p>
                                <p><span className="line-through  decoration-destructive decoration-2 capitalize">{event.recurrence_type ?? "No recurrence type"}</span> → {(!data.recurrence_type || data.recurrence_type === "no") ? "No recurrence type" : data.recurrence_type.charAt(0).toUpperCase() + data.recurrence_type.slice(1)}</p>
                            </div>
                        )}

                        {event.recurrence_ends_at !== data.recurrence_ends_at && (
                            <div>
                                <p>Recurrence end date</p>
                                <p><span className="line-through  decoration-destructive decoration-2">{event.recurrence_ends_at ?? "No end date"}</span> → {data.recurrence_ends_at ?? "No end date"}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">

                        {deletedDateOptions.length > 0 && (
                            <div className="rounded-md border bg-muted/30 p-3 border-destructive w-[20vw]">
                                <div className="flex items-center gap-2 text-sm text-destructive">
                                    <XCircleIcon className="size-6" />
                                    <p>Deleted date options</p>
                                </div>
                                <ul className="space-y-2 p-1">
                                    {deletedDateOptions.map((option) => (
                                        <li key={new Date(option.date).getTime()}>
                                            <p>{new Date(option.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                            {(option.starts_at || option.ends_at) && (
                                                <p className="pl-1">{option.starts_at ?? "-"} → {option.ends_at ?? "-"}</p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {updatedDateOptions.length > 0 && (
                            <div className="rounded-md border bg-muted/30 p-3 border-primary w-[20vw]">
                                <div className="flex items-center gap-2 text-sm text-primary">
                                    <PencilIcon className="size-6" />
                                    <p>Updated date options</p>
                                </div>
                                <ul className="space-y-2 p-1">
                                    {updatedDateOptions.map((option) => (
                                        <li key={option.date.getTime()}>
                                            <p>{new Date(option.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                            {(option.starts_at || option.ends_at) && (
                                                <div className="pl-1 flex items-center gap-1">
                                                    {event.date_options.find((d) => new Date(d.date).getTime() === option.date.getTime())?.starts_at === option.starts_at ? (
                                                        <p>{option.starts_at ?? "-"}</p>
                                                    ) : (
                                                        <span className="flex items-center gap-1">
                                                        <p className="line-through  decoration-destructive decoration-2">{event.date_options.find((d) => new Date(d.date).getTime() === option.date.getTime())?.starts_at ?? "No time"}</p>
                                                        <p>{option.starts_at ?? "-"}</p>
                                                        </span>
                                                    )}
                                                    <span className="mx-1">→</span>
                                                    {event.date_options.find((d) => new Date(d.date).getTime() === option.date.getTime())?.ends_at === option.ends_at ? (
                                                        <p>{option.ends_at ?? "-"}</p>
                                                    ) : (
                                                        <span className="flex items-center gap-1">
                                                        <p className="line-through  decoration-destructive decoration-2">{event.date_options.find((d) => new Date(d.date).getTime() === option.date.getTime())?.ends_at ?? "No time"}</p>
                                                        <p>{option.ends_at ?? "-"}</p>
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {addedDateOptions.length > 0 && (
                            <div className="rounded-md border bg-muted/30 p-3 border-success w-[20vw]">
                                <div className="flex items-center gap-2 text-sm text-success">
                                    <PlusCircleIcon className="size-6" />
                                    <p>Added date options</p>
                                </div>
                                <ul className="space-y-2 p-1">
                                    {addedDateOptions.map((option) => (
                                        <li key={option.date.getTime()}>
                                            <p>{new Date(option.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                            {(option.starts_at || option.ends_at) && (
                                                <p className="pl-1">{option.starts_at ?? "-"} → {option.ends_at ?? "-"}</p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={processing}>
                        Back
                    </Button>
                    <Button type="button" disabled={processing} onClick={onConfirm}>
                        {processing ? 'Saving…' : 'Save changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
