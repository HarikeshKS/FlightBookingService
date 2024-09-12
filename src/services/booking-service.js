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
            return flight.data.data;
        } catch (error) {
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;
