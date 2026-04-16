import { useForm } from '@inertiajs/react';
import { format, parse, startOfDay } from 'date-fns';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { store } from '@/routes/events';
import type { Group } from '@/types';

type FromData = {
    title: string;
    description: string;
    group_id: number | null;
    recurrence_type: string | null;
    recurrence_ends_at: string | null;
    date_options: {
        date: Date;
        starts_at: string | null;
        ends_at: string | null;
    }[];
}

export default function Create({ groups, recurrenceTypes }: { groups: Group[], recurrenceTypes: string[] }) {
    const { data, setData, post, processing, errors, transform } = useForm<FromData>({
        title: '',
        description: '',
        group_id: null,
        recurrence_type: null,
        recurrence_ends_at: null,
        date_options: [],
    });

    const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        transform((data) => ({
            ...data,
            recurrence_type: data.recurrence_type === "no" ? null : data.recurrence_type,
            recurrence_ends_at: data.recurrence_type === "no" ? null : data.recurrence_ends_at,
            date_options: data.date_options.map((option) => ({
                ...option,
                date: format(option.date, 'yyyy-MM-dd'),
            })),
        }));
        post(store.url(), {
            onError: (errors) => {
                if (errors.date_options) {
                    toast.error(errors.date_options);
                }
            },
        });
    };

    const removeDateOption = (index: number) => {
        const newOptions = [...data.date_options];
        newOptions.splice(index, 1);
        setData('date_options', newOptions);
    };

    return (
        <AppLayout title="Create Event">
            <div className="flex p-4 md:p-6">
                <form onSubmit={submit} className="w-full h-full">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create Event</h1>
                        <p className="text-muted-foreground">Add details and propose dates for your event.</p>
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
                                    <Label>Recurring (optional)</Label>
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

                            {data.date_options.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((option, index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end p-4 border rounded-lg bg-card">
                                    <div className="grid gap-2 flex-1 w-full">
                                        <Label>Date</Label>
                                        <span>{new Date(option.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    <div className="grid gap-2 flex-1 w-full">
                                        <Label>Start Time (optional)</Label>
                                        <Input
                                            type="time"
                                            value={option.starts_at || ''}
                                            onChange={(e) => setData('date_options', data.date_options.map((option, i) => i === index ? { ...option, starts_at: e.target.value } : option))}
                                        />
                                        <InputError message={errors[`date_options.${index}.starts_at`]} />
                                    </div>
                                    <div className="grid gap-2 flex-1 w-full">
                                        <Label>End Time (optional)</Label>
                                        <Input
                                            type="time"
                                            value={option.ends_at || ''}
                                            onChange={(e) => setData('date_options', data.date_options.map((option, i) => i === index ? { ...option, ends_at: e.target.value } : option))}
                                        />
                                        <InputError message={errors[`date_options.${index}.ends_at`]} />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive mt-6 sm:mt-0"
                                        onClick={() => removeDateOption(index)}
                                    >
                                        <TrashIcon className="h-4 w-4" />
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
                                disabled={{ before: startOfDay(new Date()) }}
                                className="w-full border-2 rounded-xl p-4"
                            />
                        </div>

                        <div className="flex justify-end gap-4 col-span-2">
                            <Button type="submit" disabled={processing}>
                                Create Event
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
