import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { Group, User } from '@/types';

type GroupsShowProps = {
    group: Group, 
    users: (User & {
        pivot: {
        invited: boolean
    }
})[]
}

export default function GroupsShow({ group, users}: GroupsShowProps ) {
console.log(group.users);

    return (
        <AppLayout title={group.name}>
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6 max-w-5xl mx-auto w-full">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Groepsleden:
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                {users?.map((user) => (
                    <TableRow key={user.id} className="flex flex-col">
                        <TableBody>
                            <TableRow>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        </TableBody>
                    </TableRow>
                ))}
            </Table>
            </div>
        </AppLayout>
    );
}