import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { format, parse, startOfDay } from 'date-fns';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { show } from '@/routes/events';
import { update } from '@/routes/events';
import type { Event, Group } from '@/types';
import ConfirmDialog from './Components/ConfirmDialog';

export default function Edit({ event, groups, recurrenceTypes }: { event: Event, groups: Group[], recurrenceTypes: string[] }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data, setData, put, processing, errors, isDirty, transform } = useForm({
        title: event.title,
        description: event.description ?? '',
        recurrence_type: event.recurrence_type ?? "no" as string | null,
        recurrence_ends_at: event.recurrence_ends_at ?? null as string | null,
        group_id: event.group_id ?? null,
        date_options: event.date_options.map((option) => ({
            date: new Date(option.date),
            starts_at: option.starts_at || null,
            ends_at: option.ends_at || null,
        })).sort((a, b) => a.date.getTime() - b.date.getTime()),
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData('recurrence_type', data.recurrence_type === "no" ? null : data.recurrence_type);
        setData('recurrence_ends_at', data.recurrence_type === "no" ? null : data.recurrence_ends_at);
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

                            <div className="space-y-2">
                                <Label>Group (optional)</Label>
                                <Select
                                    value={data.group_id?.toString() ?? undefined}
                                    onValueChange={(value) => setData('group_id', parseInt(value))}
                                    disabled={groups.length === 0}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {groups.map((group) => (
                                            <SelectItem key={group.id} value={group.id.toString()}>{group.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.group_id} />
                            </div>

                            {data.group_id && (
                                <div className="space-y-2">
                                    <Label>Recurring</Label>
                                    <Select
                                        value={data.recurrence_type?.toString() ?? "no"}
                                        onValueChange={(value) => setData('recurrence_type', value)}
                                        disabled={groups.length === 0}
                                    >
                                        <SelectTrigger className="w-full capitalize">
                                            <SelectValue placeholder="Select a recurrence type" />
                                        </SelectTrigger>
                                        <SelectContent className="capitalize">
                                            {recurrenceTypes.map((type) => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                            <SelectItem value="no">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.group_id} />
                                </div>

                            )}

                            {data.group_id && data.recurrence_type && data.recurrence_type !== 'no' && (
                                <div className="space-y-2">
                                    <Label htmlFor="recurrence_ends_at">Recurrence ends on (optional)</Label>
                                    <DatePicker
                                        date={data.recurrence_ends_at ? parse(data.recurrence_ends_at, 'yyyy-MM-dd', new Date()) : undefined}
                                        onDateChange={(date) => setData('recurrence_ends_at', date ? format(date, 'yyyy-MM-dd') : null)}
                                    />
                                    <InputError message={errors.recurrence_ends_at} />
                                </div>
                            )}

                            <p>{data.date_options.length} date options selected</p>

                            {data.date_options.length === 0 && (
                                <p className="text-muted-foreground text-sm text-center py-4">No date options selected</p>
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
                            <Button type="button" variant="outline" asChild>
                                <Link href={show(event.id)}>
                                    Cancel
                                </Link>
                            </Button>
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
                groups={groups}
            />
        </AppLayout>
    );
}
