import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

interface ApplicationData {
  date: string;
  applications: number;
}

interface ApplicationsOverTimeChartProps {
  applicationsOverTime: ApplicationData[];
}

const ApplicationsOverTimeChart = ({ applicationsOverTime }: ApplicationsOverTimeChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications Over Time</CardTitle>
        <CardDescription>Daily application count (last 30 days)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            applications: {
              label: "Applications",
              color: "hsl(var(--primary))",
            },
          }}
        >
          <BarChart data={applicationsOverTime}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar
              dataKey="applications"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {payload[0].payload.date}
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].value} applications
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ApplicationsOverTimeChart; 