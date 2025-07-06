import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import Navigation from "@/components/Navigation";

import {
  WelcomeHeader,
  StatsCards,
  ChartsSection,
  RecentActivity
} from "@/components/dashboard";

type Job = Tables<"jobs">;

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("createdAt", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", id);
      
      if (error) throw error;
      
      setJobs(jobs.filter(job => job.id !== id));
      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive",
      });
    }
  };



  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      
      // Get user information
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      fetchJobs();
    };
    
    checkAuth();
  }, [navigate]);

  const filteredJobs = filterStatus === "all" 
    ? jobs 
    : jobs.filter(job => job.status === filterStatus);

  const getStatusVariant = (status: string | null) => {
    switch (status) {
      case "applied": return "applied";
      case "interviewing": return "interviewing";
      case "offer": return "offer";  
      case "rejected": return "rejected";
      default: return "applied";
    }
  };

  // Calculate statistics
  const stats = {
    total: jobs.length,
    applied: jobs.filter(job => job.status === "applied" || !job.status).length,
    interviewing: jobs.filter(job => job.status === "interviewing").length,
    offers: jobs.filter(job => job.status === "offer").length,
    rejected: jobs.filter(job => job.status === "rejected").length,
  };

  // Calculate success rate
  const successRate = stats.total > 0 ? ((stats.offers / stats.total) * 100).toFixed(1) : "0";

  // Calculate average applications per month (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const recentJobs = jobs.filter(job => new Date(job.createdAt) >= sixMonthsAgo);
  const avgPerMonth = (recentJobs.length / 6).toFixed(1);

  // Status distribution for pie chart
  const statusData = [
    { name: "Applied", value: stats.applied, color: "hsl(var(--primary))" },
    { name: "Interviewing", value: stats.interviewing, color: "hsl(var(--warning))" },
    { name: "Offers", value: stats.offers, color: "hsl(var(--success))" },
    { name: "Rejected", value: stats.rejected, color: "hsl(var(--destructive))" },
  ].filter(item => item.value > 0);

  // Applications over time (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const applicationsOverTime = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const count = jobs.filter(job => job.appliedDate && job.appliedDate.startsWith(dateStr)).length;
    applicationsOverTime.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      applications: count,
    });
  }

  const recentJobsList = jobs.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation jobCount={jobs.length} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHeader user={user} />
        
        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="mb-6 text-center">
            <h3 className="text-lg font-semibold mb-2">No job applications yet</h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your job search by adding your first application
            </p>
            <Button onClick={() => navigate("/add-job")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Job
            </Button>
          </div>
        )}

        <StatsCards
          stats={stats}
          successRate={successRate}
          avgPerMonth={avgPerMonth}
        />

        <ChartsSection
          statusData={statusData}
          applicationsOverTime={applicationsOverTime}
        />

        <RecentActivity
          recentJobsList={recentJobsList}
          totalJobsCount={jobs.length}
          getStatusVariant={getStatusVariant}
          onNavigateToJob={(id) => navigate(`/job/${id}`)}
          onNavigateToEditJob={(id) => navigate(`/edit-job/${id}`)}
          onNavigateToApplications={() => navigate("/applications")}
        />
      </main>
    </div>
  );
};

export default Dashboard;