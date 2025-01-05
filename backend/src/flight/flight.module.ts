import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from './schemas/flight.schem';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Flight.name,
        schema: FlightSchema
      }
    ])
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
