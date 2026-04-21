import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { registerStore } from '@/routes/groups';

export default function Register({ email }: { email: string }) {
    const { data, setData, post, processing, errors } = useForm({
            name: '',
            email: email,
            password: ''
        });

    const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            post(registerStore.url());
        }; 

    console.log(email);

    return (
        <AppLayout>
            <form onSubmit={submit} className="w-full h-full">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Deelnemen aan groep</h1>
                        <p className="text-muted-foreground">Maak een account aan om aan de groep deel te nemen</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Naam</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Volledige naam"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Wachtwoord</Label>
                                <Input
                                    id="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Wachtwoord"
                                    type='password'
                                    required
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div className="flex justify-end gap-4 col-span-2">
                                <Button type="submit" disabled={processing}>
                                    Maak account
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
        </AppLayout>
    );
}
