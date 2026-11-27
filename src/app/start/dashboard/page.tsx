import StartGate from "@/components/start/StartGate";
import StartDashboardClient from "./StartDashboardClient";

export default function StartDashboardPage() {
  return (
    <StartGate>
      <StartDashboardClient />
    </StartGate>
  );
}
