import StatusDistributionChart from "./StatusDistributionChart";
import ApplicationsOverTimeChart from "./ApplicationsOverTimeChart";

interface StatusData {
  name: string;
  value: number;
  color: string;
}

interface ApplicationData {
  date: string;
  applications: number;
}

interface ChartsSectionProps {
  statusData: StatusData[];
  applicationsOverTime: ApplicationData[];
}

const ChartsSection = ({ statusData, applicationsOverTime }: ChartsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <StatusDistributionChart statusData={statusData} />
      <ApplicationsOverTimeChart applicationsOverTime={applicationsOverTime} />
    </div>
  );
};

export default ChartsSection; 