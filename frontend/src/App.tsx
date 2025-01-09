import { useEffect, useState } from "react";
import { FlightGantt } from "./components/FlightGantt";
import { useFlightStore } from "./store";
import { SchedulePlaneAdapter } from "./adapters/SchedulePlane.adapter";
import CheckupPlaneAdapter from "./adapters/CheckupPlane.adapter";
// import { mockFlightData } from "./mocks/mockFlightData";
// import { Flight } from "./store";

function App() {
  //mock data
  // const [mockData, setMockData] = useState<Flight[]>([]);
  // useEffect(() => {
  //   setMockData(mockFlightData);
  // }, []);

  const { flights, loading, error, fetchFlights } = useFlightStore();
  useEffect(() => {
    fetchFlights();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-16">
      <FlightGantt
        title="Trips of Plane"
        data={SchedulePlaneAdapter(flights)}
      />
      <FlightGantt
        title="Ground time of Plane"
        data={CheckupPlaneAdapter(flights)}
      />
    </div>
  );
}
export default App;
