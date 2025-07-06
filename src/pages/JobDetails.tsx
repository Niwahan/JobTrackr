import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Edit, Trash2, ExternalLink, Calendar, MapPin, DollarSign, FileText } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Job = Tables<"jobs">;

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthAndFetchJob = async () => {
      // Check authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      if (!id) {
        toast({
          title: "Error",
          description: "Job ID not provided",
          variant: "destructive",
        });
        navigate("/dashboard");
        return;
      }

      // Fetch job data
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setJob(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to fetch job details",
          variant: "destructive",
        });
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchJob();
  }, [id, navigate, toast]);

  const deleteJob = async () => {
    if (!job) return;
    
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", job.id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive",
      });
    }
  };

  const getStatusVariant = (status: string | null) => {
    switch (status) {
      case "applied": return "applied";
      case "interviewing": return "interviewing";
      case "offer": return "offer";  
      case "rejected": return "rejected";
      default: return "applied";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Job not found</h2>
          <Button onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-bold">Job Details</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/edit-job/${job.id}`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={deleteJob}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Main Job Info Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                  <CardDescription className="text-xl font-semibold text-foreground">
                    {job.company}
                  </CardDescription>
                </div>
                <StatusBadge status={getStatusVariant(job.status)} className="text-sm">
                  {job.status || "applied"}
                </StatusBadge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {job.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  
                  {job.salary && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  
                  {job.url && (
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Job Posting
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {job.appliedDate && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>Applied: {new Date(job.appliedDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {job.deadline && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {job.reminderDate && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>Reminder: {new Date(job.reminderDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          {job.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {job.notes}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Tags Section */}
          {job.tags && job.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Created: {new Date(job.createdAt).toLocaleDateString()} at {new Date(job.createdAt).toLocaleTimeString()}</p>
                <p>Application ID: {job.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;