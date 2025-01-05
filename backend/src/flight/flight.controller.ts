import { Body, Controller, Get, Post } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/CreateFlight.controller.dto';

@Controller('flights')
export class FlightController {
    constructor(
        private readonly flightService: FlightService
    ) {}



    @Post()
    async createFlight(@Body() body: CreateFlightDto) {
        return this.flightService.create({
            planeId: body.planeId,
            origin: body.origin,
            destination: body.destination,
            departureTime: new Date(body.departureTime),
            arrivalTime: new Date(body.arrivalTime)
        });
    }

    @Get()
    async getAllFlights() {
        return this.flightService.getAllFlights();
    }

}
