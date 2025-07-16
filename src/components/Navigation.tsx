import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, List } from "lucide-react";

interface NavigationProps {
  jobCount?: number;
}

const Navigation = ({ jobCount = 0 }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getCurrentTab = () => {
    if (location.pathname === "/dashboard") return "dashboard";
    if (location.pathname === "/applications") return "applications";
    return "dashboard";
  };

  const handleTabChange = (value: string) => {
    if (value === "dashboard") {
      navigate("/dashboard");
    } else if (value === "applications") {
      navigate("/applications");
    }
  };

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              JobTrackr
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {jobCount} applications
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Tabs value={getCurrentTab()} onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="applications" className="flex items-center space-x-2">
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">Applications</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button variant="outline" onClick={handleSignOut} size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation; 