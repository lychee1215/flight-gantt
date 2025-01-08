export interface FlightScheduleItem {
    startTime: Date;
    endTime: Date;
    title: string;
}

interface FlightScheduleRowProps {
    flightScheduleItems: FlightScheduleItem[];
    mostEarliestStartTime: number;
    leftPadding: number;
    oneHourWidth: number;
    color?: string
}

export const FlightScheduleRow: React.FC<FlightScheduleRowProps> = ({ flightScheduleItems, mostEarliestStartTime, leftPadding, oneHourWidth, color }) => {

    return (
        <div className="w-full relative">
            {flightScheduleItems.map((flightScheduleItem, index) => {
             
                // Figure out the left
                const duration = flightScheduleItem.endTime.getTime() - flightScheduleItem.startTime.getTime();
             
               
                const timeDiff = flightScheduleItem.startTime.getTime() - mostEarliestStartTime;
                const left = leftPadding + timeDiff / 1000 / 60 / 60 * oneHourWidth;
                
                // Figure out the width
                const width = duration / 1000 / 60 / 60 * oneHourWidth;
            
                return (
                    <div 
                    key={flightScheduleItem.title}
                    className="h-8 my-1 absolute flex justify-center items-center"
                    style={{
                        left,
                        width,
                        backgroundColor: color,
                        top: `${index * 2.5}rem`
                    }}>
                        {flightScheduleItem.title}
                    </div>
                )
            })}
        </div>
    )
};