import { Flight } from "../store";
import { FlightGanttData } from "../components/FlightGantt/FlightSchedule";
import { getRandomLightHexColor } from "../components/FlightGantt/until";
import { Adapter } from "./adpater";

const CheckupPlaneAdapter: Adapter = (flights: Flight[]): FlightGanttData[] => {
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
      

      const sortedSchedules = schedules.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      const checkupSchedules: FlightGanttData['schedules'] = [];

      for (let i = 0; i < sortedSchedules.length - 1; i ++) {
        let airport = sortedSchedules[i].title.split(' -> ')[0];
        let startTime = sortedSchedules[i].endTime;
        let endTime = sortedSchedules[i + 1].startTime;
        checkupSchedules.push({
          startTime,
          endTime,
          title: airport
        });
      }

      return {
        name: flightId,
        schedules: checkupSchedules,
        color: getRandomLightHexColor()
      }
    })
};

export default CheckupPlaneAdapter;