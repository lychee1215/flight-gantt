import { FlightGanttData } from "../components/FlightGantt/FlightSchedule";
import { getRandomLightHexColor } from "../components/FlightGantt/until";
import { Flight } from "../store";
import { Adapter } from "./adpater";


export const SchedulePlaneAdapter: Adapter = (flights: Flight[]) => {
    const dataMap: Map<string, FlightGanttData['schedules']> = new Map();
    flights.forEach(flight => {
      if (!dataMap.has(flight.planeId)) {
        dataMap.set(flight.planeId, []);
      }
      dataMap.get(flight.planeId)?.push({
        startTime: new Date(flight.departureTime),
        endTime: new Date(flight.arrivalTime),
        title: `${flight.origin} -> ${flight.destination}`
      });
    });
    return Array.from(dataMap.entries()).map(([flightId, schedules]) => {
      return {
        name: flightId,
        schedules,
        color: getRandomLightHexColor()
      }
    })
}