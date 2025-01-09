import { getLastHourTime } from "../until";

interface TimeScaleMarkProps {
  startTime: Date;
  endTime: Date;
  unitHours: number;
  leftPadding: number;
  oneHourWidth: number;
  flightNumber: number;
}

export const TimeScaleMark: React.FC<TimeScaleMarkProps> = ({
  startTime,
  endTime,
  unitHours,
  leftPadding,
  oneHourWidth,
  flightNumber,
}) => {
  const times: Date[] = [];
  let time: number = getLastHourTime(startTime.getTime());
  let lastOneMarkTime: number =
    getLastHourTime(endTime.getTime()) + 1000 * 60 * 60;

  while (time <= lastOneMarkTime) {
    times.push(new Date(time));
    time += 1000 * 60 * 60 * unitHours;
  }

  return (
    <div>
      {times.map((time) => {
        const hour =
          time.getUTCHours() < 10
            ? `0${time.getUTCHours()}`
            : time.getUTCHours().toString();
        const minute =
          time.getUTCMinutes() < 10
            ? `0${time.getUTCMinutes()}`
            : time.getUTCMinutes().toString();

        const timeDiff = time.getTime() - getLastHourTime(startTime.getTime());
        const left = leftPadding + (timeDiff / 1000 / 60 / 60) * oneHourWidth;

        return (
          <div
            className="absolute top-0 bg-slate-400"
            style={{ left, width: 1, height: `${flightNumber * 2.5}rem` }}
            key={time.getTime()}
          >
            <span className="absolute bottom-[-20px] left-[-20px]">
              {hour}:{minute}
            </span>
          </div>
        );
      })}
    </div>
  );
};
