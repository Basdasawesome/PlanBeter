import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import AppLayout from '@/layouts/app-layout';
import type { Event } from '@/types';

export const description = "A horizontal bar chart"

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartBarHorizontal(title: string, description: string | null, chartData: Array<{ month: string; availability: number; }>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
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
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Beter plannen met planBeter <TrendingUp className="h-4 w-4" />
                </div>
            </CardFooter>
        </Card >
    )
}


export default function Overview({ event }: { event: Event }) {
    const chartData = event.date_options.map(option => {
        let count = 0;
        const month = new Date(option.date).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

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

    return (
        <AppLayout title={event.title}>
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6 max-w-3xl mx-auto w-full">
                {ChartBarHorizontal(event.title, event.description, chartData)}
            </div>
        </AppLayout>
    )
}