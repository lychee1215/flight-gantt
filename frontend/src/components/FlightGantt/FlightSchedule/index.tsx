import { getLastHourTime } from "../until";
import { FlightScheduleItem, FlightScheduleRow } from "./FlightScheduleRow";
import { TimeScaleMark } from "./TimeScaleMark";

export interface FlightGanttData {
    name: string;
    schedules: Array<FlightScheduleItem>;
    color?: string
}
interface FlightGanttScheduleProps {
    data: FlightGanttData[];
}



/**
 * Figure out the most long duration
 * @param schedules 
 * @param oneHourWidth 
 * @returns 
 */
const figureOutLongestDuration = (schedules: FlightScheduleItem[][], oneHourWidth: number) => {

    const allScheduleItems = schedules.flat();

    let mostEarliestStartTime: number = Number.MAX_SAFE_INTEGER;
    let mostLatestEndTime: number = 0;

    let maxDuration = 0;
    for (let item of allScheduleItems) {
        if (item.startTime.getTime() < mostEarliestStartTime) {
            mostEarliestStartTime = item.startTime.getTime();
        }

        if (item.endTime.getTime() > mostLatestEndTime) {
            mostLatestEndTime = item.endTime.getTime();
        }
    }

    let duration = getLastHourTime(mostLatestEndTime) + 1000 * 60 * 60 - getLastHourTime(mostEarliestStartTime);
    if (duration > maxDuration) {
        maxDuration = duration;
    }

    const maxDurationHours = maxDuration / 1000 / 60 / 60;
    const width = maxDurationHours * oneHourWidth;

    return [width, mostEarliestStartTime, mostLatestEndTime];
}

const oneHourWidth = 200;

export const FlightGanttSchedule: React.FC<FlightGanttScheduleProps> = ({ data }) => {

    const [width, mostEarliestStartTime, mostLatestEndTime] = figureOutLongestDuration(data.map(flight => flight.schedules), oneHourWidth);


    return (
        <div style={{ width: width + 200 }} className="relative">
            <div>
                {data.map(item => {
                    return (
                        <div className="h-10 box-border" key={item.name}>
                            <FlightScheduleRow
                            
                                flightScheduleItems={item.schedules}
                                mostEarliestStartTime={mostEarliestStartTime}
                                leftPadding={100}
                                oneHourWidth={oneHourWidth}
                                color={item.color} />
                        </div>
                    )
                })}
                <div>
                    <TimeScaleMark
                        flightNumber={data.length}
                        startTime={new Date(mostEarliestStartTime)}
                        endTime={new Date(mostLatestEndTime)}
                        unitHours={3}
                        leftPadding={100}
                        oneHourWidth={oneHourWidth} />
                </div>
            </div>
        </div>
    );
};
