const booking = require("../model/bookingModel")
const Users = require("../model/userModel")

const createBooking = async (req, res) => {
    console.log(req.body)
    const {aamaId, dateTime} = req.body
    const userId = req.user.id

    if(!aamaId || !dateTime) {
        return res.json({
            success: false,
            message: "Fill all the details"
        })
    }
    if(!userId) {
        res.json({
            success: false,
            message: 'User not found'
        })
    }
    try {
        const newBooking = new booking({
            aama: aamaId,
            by: userId,
            dateTime: dateTime
        });
        await newBooking.save()
        const user = await Users.findByIdAndUpdate(
            userId,
            { $push: { booked: newBooking._id } },
            { new: true }
        );
        res.json({
            success: true,
            message: "Aama booked successfully",
            user: user
          });
    } catch (error) {
        console.log(error)
        req.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }       
}

const getAllBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.json({
                success: false,
                message: 'User not found',
            });
        }

        const bookingDetails = await booking.find({
            by: req.user.id,
        }).populate('aama')

        res.json({
            success: true,
            bookings: bookingDetails,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

const deleteBookingById = async (req, res) => {
    const id = req.params.id;
    try {
      await booking.findByIdAndDelete(id)
      res.status(201).json({
        success: true,
        message: "Deleted Successfully"
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error"
      })
    }
   }


module.exports = {
    createBooking,
    getAllBookings,
    deleteBookingById
}