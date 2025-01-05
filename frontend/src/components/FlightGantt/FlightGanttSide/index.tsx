
interface FlightGanttSideProps {
    flightNames: string[]
}

export const FlightGanttSide: React.FC<FlightGanttSideProps> = ({flightNames}) => {
    return (
        <div className="w-full">
            {flightNames.map(flightName => {
                return (
                    <div key={flightName} className="h-10 border flex justify-center items-center">
                        {flightName}
                    </div>
                )
            })}

            <div key='end1' className="h-5"></div>
            <div key='end2' className="h-5"></div>
        </div>
    );
};