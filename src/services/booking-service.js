const { default: axios } = require("axios");
const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_URL } = require("../config/server-config");
const { ServiceError } = require("../utils/errors");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async create(data) {
        try {
            const flightId = data.flightId;
            const flightServiceURL = `${FLIGHT_SERVICE_URL}/api/v1/flights/${flightId}`;
            const flight = await axios.get(flightServiceURL);
            const flightData = flight.data.data;
            let priceOfFlight = flightData.price;

            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError(
                    "SeatsAvalibilityError",
                    "Insufficient seats in the flight"
                );
            }
            let totalCost;
            if (data.noOfSeats) {
                totalCost = priceOfFlight * data.noOfSeats;
            } else {
                totalCost = priceOfFlight;
            }
            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepository.create(bookingPayload);

            await axios.patch(flightServiceURL, {
                totalSeats: flightData.totalSeats - booking.noOfSeats,
            });

            const finalBooking = await this.bookingRepository.update(
                booking.id,
                {
                    status: "Booked",
                }
            );

            return finalBooking;
        } catch (error) {
            console.log(error);
            
            if (
                error.name == "RepositoryError" ||
                error.name == "ValidationError"
            ) {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;
