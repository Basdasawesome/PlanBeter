import { useForm } from '@inertiajs/react';
import { format, startOfDay } from 'date-fns';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { update } from '@/routes/events';
import type { Event } from '@/types';
import ConfirmDialog from './Components/ConfirmDialog';

export default function Edit({ event }: { event: Event }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data, setData, put, processing, errors, isDirty, transform } = useForm({
        title: event.title,
        description: event.description ?? '',
        date_options: event.date_options.map((option) => ({
            date: new Date(option.date),
            starts_at: option.starts_at || null,
            ends_at: option.ends_at || null,
        })).sort((a, b) => a.date.getTime() - b.date.getTime()),
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setConfirmOpen(true);
    };

    const handleConfirmSave = () => {
        transform((payload) => {
            const deletedDateOptions = event.date_options.filter((option) => !data.date_options.some((d) => d.date.getTime() === new Date(option.date).getTime())).map((option) => ({
                ...option,
                date: format(option.date, 'yyyy-MM-dd'),
                deleted: true,
            }));
            const addedDateOptions = data.date_options.filter((option) => !event.date_options.some((d) => new Date(d.date).getTime() === option.date.getTime())).map((option) => ({
                ...option,
                date: format(option.date, 'yyyy-MM-dd'),
            }));
            const updatedDateOptions = data.date_options.filter((option) => event.date_options.some((d) => new Date(d.date).getTime() === option.date.getTime() && (d.starts_at !== option.starts_at || d.ends_at !== option.ends_at))).map((option) => ({
                ...option,
                date: format(option.date, 'yyyy-MM-dd'),
            }));

            return {
                ...payload,
                date_options: [...deletedDateOptions, ...addedDateOptions, ...updatedDateOptions],
            };
        });

        put(update.url(event), {
            preserveScroll: true,
            onSuccess: () => setConfirmOpen(false),
        });
    };

    const removeDateOption = (index: number) => {
        setData(
            'date_options',
            data.date_options.filter((option, i) => i !== index),
        );
    };

    return (
        <AppLayout title="Edit Event">
            <div className="flex p-4 md:p-6">
                <form onSubmit={handleSubmit} className="w-full h-full">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Event</h1>
                        <p className="text-muted-foreground">Update details and proposed dates for your event.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Event Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. Weekend Getaway"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description (optional)</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="What's the plan?"
                                />
                                <InputError message={errors.description} />
                            </div>

                            {data.date_options.length > 0 && (
                                <p className="text-muted-foreground text-sm">{data.date_options.length} options selected</p>
                            )}

                            {data.date_options.map((option, index) => (
                                <div
                                    key={`${new Date(option.date).toISOString()}-${index}`}
                                    className="flex flex-col gap-4 items-start sm:flex-row sm:items-end rounded-lg border bg-card p-4"
                                >
                                    <div className="grid w-full flex-1 gap-2">
                                        <Label>Date</Label>
                                        <span>
                                            {new Date(option.date).toLocaleDateString(undefined, {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="grid w-full flex-1 gap-2">
                                        <Label>Start Time (optional)</Label>
                                        <Input
                                            type="time"
                                            value={option.starts_at || ''}
                                            onChange={(e) =>
                                                setData(
                                                    'date_options',
                                                    data.date_options.map((opt, i) =>
                                                        i === index
                                                            ? { ...opt, starts_at: e.target.value }
                                                            : opt,
                                                    ),
                                                )
                                            }
                                        />
                                        <InputError message={errors[`date_options.${index}.starts_at`]} />
                                    </div>
                                    <div className="grid w-full flex-1 gap-2">
                                        <Label>End Time (optional)</Label>
                                        <Input
                                            type="time"
                                            value={option.ends_at || ''}
                                            onChange={(e) =>
                                                setData(
                                                    'date_options',
                                                    data.date_options.map((opt, i) =>
                                                        i === index
                                                            ? { ...opt, ends_at: e.target.value }
                                                            : opt,
                                                    ),
                                                )
                                            }
                                        />
                                        <InputError message={errors[`date_options.${index}.ends_at`]} />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="mt-6 text-destructive sm:mt-0"
                                        onClick={() => removeDateOption(index)}
                                    >
                                        <TrashIcon className="size-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <Calendar
                                mode="multiple"
                                selected={data.date_options.map((option) => new Date(option.date))}
                                onSelect={(dates) => {
                                    const currentOptionsByDate = new Map(
                                        data.date_options.map((option) => [new Date(option.date).toDateString(), option]),
                                    );

                                    setData(
                                        'date_options',
                                        dates?.map((date) => {
                                            const existingOption = currentOptionsByDate.get(date.toDateString());

                                            return existingOption
                                                ? {
                                                    date,
                                                    starts_at: existingOption.starts_at,
                                                    ends_at: existingOption.ends_at,
                                                }
                                                : { date, starts_at: null, ends_at: null };
                                        }) || [],
                                    );
                                }}
                                className="w-full rounded-xl border-2 p-4"
                                disabled={{ before: startOfDay(new Date()) }}
                            />
                        </div>

                        <div className="col-span-2 flex justify-end gap-4">
                            <Button type="submit" disabled={processing || !isDirty}>
                                Save changes
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                onConfirm={handleConfirmSave}
                processing={processing}
                event={event}
                data={data}
            />
        </AppLayout>
    );
}
