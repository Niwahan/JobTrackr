import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Eye, Edit } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Job = Tables<"jobs">;

interface RecentActivityProps {
  recentJobsList: Job[];
  totalJobsCount: number;
  getStatusVariant: (status: string | null) => string;
  onNavigateToJob: (id: string) => void;
  onNavigateToEditJob: (id: string) => void;
  onNavigateToApplications: () => void;
}

const RecentActivity = ({
  recentJobsList,
  totalJobsCount,
  getStatusVariant,
  onNavigateToJob,
  onNavigateToEditJob,
  onNavigateToApplications
}: RecentActivityProps) => {
  if (recentJobsList.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentJobsList.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <p className="text-xs text-muted-foreground">
                    Applied: {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={getStatusVariant(job.status)}>
                  {job.status || "applied"}
                </StatusBadge>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigateToJob(job.id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigateToEditJob(job.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {totalJobsCount > 5 && (
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={onNavigateToApplications}>
              View All Applications
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity; 