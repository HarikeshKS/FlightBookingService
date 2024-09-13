const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.create(req.body);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message: "Successfully created the booking",
            err: {},
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation,
        });
    }
};

module.exports = {
    create,
};
