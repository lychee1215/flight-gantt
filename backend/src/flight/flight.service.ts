import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flight, FlightDocument } from './schemas/flight.schem';

@Injectable()
export class FlightService {
  constructor(@InjectModel(Flight.name) private readonly flightModel) {}


  async getFlightsByPlaneId(planeId: string): Promise<FlightDocument[]> {
    return this.flightModel.find({ planeId });
  }

  async getAllFlights(): Promise<FlightDocument[]> {
    return this.flightModel.find();
  }

  async create(flightData: Flight) {
    const allFlights = await this.getFlightsByPlaneId(flightData.planeId);
    for (const flight of allFlights) {

      if (flightData.planeId !== flight.planeId) {
        continue;
      }
      // Check if the new flight time conficts with any existing flight
      if (
        (
          flightData.departureTime <= flight.departureTime &&
          flightData.arrivalTime >= flight.departureTime
        ) ||
        (
          flightData.departureTime >= flight.departureTime &&
          flightData.departureTime <= flight.arrivalTime
        )
      ) {
        throw new BadRequestException({
          error: 'Flight time conflicts with existing flight',
          conflictFlight: flight
        });
      }
    }


    return this.flightModel.create(flightData);
  }
}
