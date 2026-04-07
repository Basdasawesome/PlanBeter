import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { store } from '@/routes/groups';

export default function GroupsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <AppLayout title="Create Group">
            <div className="flex p-4 md:p-6">
                <form onSubmit={submit} className="w-full h-full">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create Group</h1>
                        <p className="text-muted-foreground">Add details and propose dates for your Group.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Group Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Weekend Getaway"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="flex justify-end gap-4 col-span-2">
                                <Button type="submit" disabled={processing}>
                                    Create Group
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
