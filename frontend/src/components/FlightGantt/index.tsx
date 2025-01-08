import { FlightGanttSide } from "./FlightGanttSide";
import { FlightGanttData, FlightGanttSchedule } from "./FlightSchedule";


interface FlightGanttProps {
    data: FlightGanttData[];
    title: string;
}

export const FlightGantt: React.FC<FlightGanttProps> = ({ data, title }) => {
    return (
        <div>
            <h1 className="text-center mb-5">{title}</h1>
            <div className="w-full grid grid-cols-12">
                <div className="col-span-1">
                    <FlightGanttSide airplanes={data.map(flight => ({ name: flight.name, flightsNumber: flight.schedules.length }))} />
                </div>
                <div className="col-span-10 border overflow-auto">
                    <FlightGanttSchedule data={data} />
                </div>
            </div>
        </div>
    )
};