import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, Search, Grid3X3, List, MapPin, Calendar, DollarSign, ExternalLink } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import Navigation from "@/components/Navigation";
import { normalizeUrl } from "@/lib/utils";

type Job = Tables<"jobs">;

const Applications = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
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
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchJobs();
    };

    checkAuth();
  }, [navigate]);

  const getStatusVariant = (status: string | null) => {
    switch (status) {
      case "applied": return "applied";
      case "interviewing": return "interviewing";
      case "offer": return "offer";
      case "rejected": return "rejected";
      default: return "applied";
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;
    const matchesSearch = searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation jobCount={jobs.length} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Applications</h1>
            <p className="text-muted-foreground">Manage your job applications</p>
          </div>
          <Button onClick={() => navigate("/add-job")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Application
          </Button>
        </div>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Applications</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-input rounded-md">
                  <Button
                    variant={viewMode === "cards" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("cards")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-2">
                    {searchTerm || filterStatus !== "all"
                      ? "No applications found"
                      : "No job applications yet"
                    }
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || filterStatus !== "all"
                      ? "Try adjusting your search or filter criteria."
                      : "Start tracking your job applications by adding your first one."
                    }
                  </p>
                  {!searchTerm && filterStatus === "all" && (
                    <Button onClick={() => navigate("/add-job")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Job
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : viewMode === "cards" ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Job Applications ({filteredJobs.length})</h2>
              <p className="text-sm text-muted-foreground">
                {searchTerm && `Search results for "${searchTerm}"`}
                {filterStatus !== "all" && `Filtered by ${filterStatus} status`}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
                        <CardDescription className="text-base font-medium text-foreground mt-1">
                          {job.company}
                        </CardDescription>
                      </div>
                      <StatusBadge status={getStatusVariant(job.status)}>
                        {job.status || "applied"}
                      </StatusBadge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {job.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-2" />
                        {job.salary}
                      </div>
                    )}
                    {job.appliedDate && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        Applied {new Date(job.appliedDate).toLocaleDateString()}
                      </div>
                    )}
                    {job.reminderDate && (
                      <div className="flex items-center text-sm text-orange-600 dark:text-orange-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        Reminder {new Date(job.reminderDate).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/job/${job.id}`)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/edit-job/${job.id}`)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteJob(job.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {job.url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(normalizeUrl(job.url), '_blank')}
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Job Applications ({filteredJobs.length})</CardTitle>
              <CardDescription>
                {searchTerm && `Search results for "${searchTerm}"`}
                {filterStatus !== "all" && `Filtered by ${filterStatus} status`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{job.title}</div>
                          {job.salary && (
                            <div className="text-sm text-muted-foreground">{job.salary}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.location || "—"}</TableCell>
                      <TableCell>
                        <StatusBadge status={getStatusVariant(job.status)}>
                          {job.status || "applied"}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        {job.appliedDate
                          ? new Date(job.appliedDate).toLocaleDateString()
                          : "—"
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/job/${job.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/edit-job/${job.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteJob(job.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Applications; 