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

    return (
        <AppLayout title={event.title}>
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6 max-w-3xl mx-auto w-full">
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
                </Card >
            </div>
        </AppLayout>
    )
}
