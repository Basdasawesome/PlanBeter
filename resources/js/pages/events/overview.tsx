import { router } from "@inertiajs/react"
import { useEchoPublic } from "@laravel/echo-react"
import { useEffect, useMemo, useState } from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import AppLayout from '@/layouts/app-layout';
import type { Event, Availability } from '@/types';

const chartConfig = {
    desktop: {
        label: "Availability",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

const barHeight = 40 // px per dag
const minHeight = 200 // minimum hoogte

export default function Overview({ event }: { event: Event }) {
    const [dateOptions, setDateOptions] = useState(event.date_options);

    useEffect(() => {
        // Reset local state when switching to a different event.
        setDateOptions(event.date_options);
    }, [event.id, event.date_options]);

    const [sorting, setSorting] = useState('SortByDate');

    useEchoPublic(`event.${event.id}`, '.attendance.submitted', (e: { availability: Availability }) => {
        setDateOptions((prevDateOptions) => {
            const { date_option_id, user_id, status } = e.availability;

            const dateOptionIndex = prevDateOptions.findIndex(option => option.id === date_option_id);

            if (dateOptionIndex === -1) {
                return prevDateOptions;
            }

            const nextDateOptions = [...prevDateOptions];
            const dateOption = nextDateOptions[dateOptionIndex];

            const availabilityIndex = dateOption.availabilities.findIndex(a => a.user_id === user_id);
            const nextAvailabilities =
                availabilityIndex === -1
                    ? [...dateOption.availabilities, e.availability]
                    : dateOption.availabilities.map(a => a.user_id === user_id ? { ...a, status } : a);

            nextDateOptions[dateOptionIndex] = {
                ...dateOption,
                availabilities: nextAvailabilities,
            };

            return nextDateOptions;
        });
    });

    useEchoPublic(`event.${event.id}`, '.event.edited', () => {
        router.reload({
            only: ['event'],
        });
    });

    const chartData = useMemo<{ month: string, availability: number }[]>(() => {
        const getDefault = dateOptions.map(option => {
            let count = 0;
            const month = new Date(option.date).toLocaleDateString(undefined, { month: "short", day: "numeric" });

            option.availabilities.forEach(a => {
                if (a.status === 'yes') {
                    count++;
                } else if (a.status === 'maybe') {
                    count += 0.5;
                }
            });

            return {
                month,
                availability: count
            };
        });

        switch (sorting) {
            case "Ascending":
                return [...getDefault].sort((a, b) => b.availability - a.availability);
            case "Descending":
                return [...getDefault].sort((a, b) => a.availability - b.availability);
            case "SortByDate":
                return getDefault;
            default:
                return getDefault;
        }
    }, [sorting, dateOptions]);

    const chartHeight = Math.max(chartData.length * barHeight, minHeight)

    const overview: Record<string, [string, string][]> = {};

    dateOptions.forEach(date => {
        overview[date.date] = [];
        date.availabilities.forEach(option => {
            overview[date.date].push([option.user.name, option.status]);
        });
    });

    console.log(overview);

    const users = [...new Set(dateOptions.flatMap(d => d.availabilities.map(a => a.user.name)))];

    return (
        <AppLayout title={event.title}>
            <div className="grid grid-cols-2 gap-6 rounded-xl p-4 md:p-6 max-w-7xl">
                <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription>{event.description}</CardDescription>
                        </div>
                        <div>
                            <Select
                                value={sorting}
                                onValueChange={(value) => setSorting(value)}
                            >
                                <SelectTrigger className="w-full max-w-48">
                                    <SelectValue placeholder="Sort by date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sorteren op</SelectLabel>
                                        <SelectItem value="SortByDate">Datum</SelectItem>
                                        <SelectItem value="Ascending">Oplopend</SelectItem>
                                        <SelectItem value="Descending">Aflopend</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={chartConfig}
                            style={{ height: chartHeight }}
                            className="w-full">
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                layout="vertical"
                                margin={{
                                    left: 15,
                                }}
                            >
                                <XAxis type="number" dataKey="availability" hide />
                                <YAxis
                                    dataKey="month"
                                    type="category"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="availability" fill="var(--color-desktop)" radius={5} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <div className="overflow-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Date</th>
                                {users.map(user => (
                                    <th key={user} className="p-2 text-center">{user}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dateOptions.map(date => (
                                <tr key={date.date} className="border-t">
                                    <td className="p-2 font-medium">{date.date}</td>
                                    {users.map(user => {
                                        const entry = date.availabilities.find(a => a.user.name === user);

                                        return (
                                            <td key={user} className="p-2 text-center">
                                                <span className={`inline-block w-3 h-3 rounded-full ${entry?.status === 'yes' ? 'bg-green-500' :
                                                    entry?.status === 'maybe' ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`} />
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    )
}
