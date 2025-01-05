import { FlightGanttData } from "../components/FlightGantt/FlightSchedule";
import { Flight } from "../store";

export  type Adapter = (flights: Flight[]) => FlightGanttData[];