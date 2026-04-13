import { useForm } from '@inertiajs/react';
import { startOfDay } from 'date-fns';
import { TrashIcon } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { store } from '@/routes/events';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        date_options: [
            { date: new Date(), starts_at: '', ends_at: '' }
        ],
    });

    const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store.url());
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
                                            value={option.starts_at}
                                            onChange={(e) => setData('date_options', data.date_options.map((option, i) => i === index ? { ...option, starts_at: e.target.value } : option))}
                                        />
                                        <InputError message={errors[`date_options.${index}.starts_at`]} />
                                    </div>
                                    <div className="grid gap-2 flex-1 w-full">
                                        <Label>End Time (optional)</Label>
                                        <Input
                                            type="time"
                                            value={option.ends_at}
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
                                onSelect={(dates) => setData('date_options', dates?.map((date) => ({ date: date, starts_at: '', ends_at: '' })) || [])}
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
