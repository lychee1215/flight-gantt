
interface FlightGanttSideProps {
    airplanes: Array<{
        name: string;
        flightsNumber: number
    }>;
}

export const FlightGanttSide: React.FC<FlightGanttSideProps> = ({airplanes}) => {
    return (
        <div className="w-full">
            {airplanes.map(airplane => {
                return (
                    <div key={airplane.name} 
                        style={{
                            height: `${airplane.flightsNumber * 2.5}rem`
                        }}
                        className="border flex justify-center items-center">
                        {airplane.name}
                    </div>
                )
            })}

            <div key='end1' className="h-5"></div>
            <div key='end2' className="h-5"></div>
        </div>
    );
};