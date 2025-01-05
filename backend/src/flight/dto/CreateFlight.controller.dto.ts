import { IsString, IsDateString } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  planeId: string;

  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalTime: string;
}
