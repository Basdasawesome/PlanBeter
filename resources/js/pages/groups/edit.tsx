import { router, useForm } from '@inertiajs/react';
import { MinusIcon } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { update,detachUser, changeRole as changeRoleRoute, sendMail } from '@/routes/groups';
import type { Group, Roles, User } from '@/types';

type GroupsEditProps = {
    group: Group, 
    roles: Roles, 
    users: (User & {
        pivot: {
        invited: boolean
    }
})[]
}
export default function GroupsEdit({ group, roles, users }: GroupsEditProps ) {
    const [email, setEmail] = useState('');

    const { data, setData, put, processing, errors } = useForm({
        name: group.name,
        email: ''
    });

    const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(update.url(group));
    }; 

    const inviteUser = () => {
        router.get(sendMail.url({group: group.id}), {email: email}  ,{
             preserveScroll: true,
             onSuccess: () => setEmail(''),
    })
    };

    const changeRole = (role: string, user: User) => {
        router.put(changeRoleRoute.url(group.id), {role: role, user: user.id}, {
             preserveScroll: true,
             except: ['group']
    })
    };

    const removeUser = (user: User) => {
        router.delete(detachUser.url({group: group.id, user: user.id }), {
             preserveScroll: true
    })
    };

console.log(users)

    return (
        <AppLayout title={group.name}>
            <div className="flex p-4 md:p-6">
                <form onSubmit={submit} className="w-full h-full">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create Group</h1>
                        <p className="text-muted-foreground">Edit your group</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Group Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder={group.name}
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="addmembers">Add Members</Label>
                                <Input
                                    id="addmembers"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <InputError message={errors.email} />
                            <Button type='button' onClick={() => inviteUser()}>Lid Uitnodigen</Button>
                            </div>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {users.map((user) => (
                                    <div key={user.id} className="flex flex-col">
                                        <header>
                                            <h2>{user.email}</h2>
                                        </header>
                                        <footer className='gap-2'>
                                            <Select defaultValue={user.pivot.role} onValueChange={(role) => {
                                                changeRole(role, user)
                                                }}>
                                                <SelectTrigger className='capitalize'>
                                                    <SelectValue placeholder='Role'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {roles.map((role) => (
                                                            <SelectItem value={role} className='capitalize'>{role}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <Button type='button' onClick={() => removeUser(user)}>
                                                    <MinusIcon className="mr-2 h-4 w-4" />
                                                    Delete Member
                                            </Button>
                                        </footer>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-4 col-span-2">
                                <Button type="submit" disabled={processing}>
                                    Edit Group
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}