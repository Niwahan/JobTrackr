import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

interface StatusData {
  name: string;
  value: number;
  color: string;
}

interface StatusDistributionChartProps {
  statusData: StatusData[];
}

const StatusDistributionChart = ({ statusData }: StatusDistributionChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Distribution</CardTitle>
        <CardDescription>Breakdown of your applications by status</CardDescription>
      </CardHeader>
      <CardContent>
        {statusData.length > 0 ? (
          <ChartContainer
            config={{
              applied: {
                label: "Applied",
                color: "hsl(var(--primary))",
              },
              interviewing: {
                label: "Interviewing",
                color: "hsl(var(--warning))",
              },
              offers: {
                label: "Offers",
                color: "hsl(var(--success))",
              },
              rejected: {
                label: "Rejected",
                color: "hsl(var(--destructive))",
              },
            }}
          >
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                strokeWidth={2}
                stroke="hsl(var(--background))"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].name}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No data to display
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusDistributionChart; 