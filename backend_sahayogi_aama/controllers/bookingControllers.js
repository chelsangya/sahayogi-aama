const booking = require("../model/bookingModel");
const Users = require("../model/userModel");
const stripe = require("stripe")(process.env.STRIPE_KEY);


const createBooking = async (req, res) => {
  console.log(req.body);
  const { aamaId, startDate, endDate } = req.body;
  const userId = req.user.id;
  if (!aamaId || !startDate || !endDate) {
    return res.status(403).json({
      success: false,
      message: "Fill all the details",
    });
  }
  if (!userId) {
    return res.status(403).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    const existingAamaBookings = await booking.find({
      aama: aamaId,
      $or: [
        {
          startDate: { $gte: startDate, $lt: endDate },
          endDate: { $gt: startDate, $lte: endDate },
        },
        {
          startDate: { $lt: startDate },
          endDate: { $gt: endDate },
        },
        {
          startDate: { $lte: startDate },
          endDate: { $gte: endDate },
        },
      ],
    });

    if (existingAamaBookings.length > 0) {
      return res.json({
        success: false,
        message: "Aama already booked for the specified time and date",
      });
    }

    const userExistingBookings = await booking.find({
      // by: userId,
      aama: aamaId,
      $or: [
        {
          startDate: { $gte: startDate, $lt: endDate },
          endDate: { $gt: startDate, $lte: endDate },
        },
        {
          startDate: { $lt: startDate },
          endDate: { $gt: endDate },
        },
        {
          startDate: { $lte: startDate },
          endDate: { $gte: endDate },
        },
      ],
    });

    if (userExistingBookings.length > 0) {
      return res.json({
        success: false,
        message:
          "You have already booked a Aama for the specified time and date",
      });
    }

    // If no existing bookings, proceed to create a new booking
    const newBooking = new booking({
      aama: aamaId,
      by: userId,
      startDate: startDate,
      endDate: endDate,
    });
    await newBooking.save();
    const user = await Users.findByIdAndUpdate(
      userId,
      { $push: { booked: newBooking._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Aama booked successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const bookingDetails = await booking
      .find({
        by: req.user.id,
      })
      .populate("aama");

    const bookingDetailsAdmin = await booking
      .find()
      .populate("aama")
      .populate("by");

    res.json({
      success: true,
      bookings: bookingDetails,
      bookingsAdmin: bookingDetailsAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteBookingById = async (req, res) => {
  const id = req.params.id;
  try {
    await booking.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const makePayment = async (req, res) => {
  try {
    const { token, amount, aamaId, startDate, endDate } = req.body;
    console.log(req.body)

    // const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const charge = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: "Amma Booked !!!",
    });

    const transactionId = charge.id;

    // Save booking details
    const newBooking = new booking({
      aama: aamaId,
      by: req.user.id,
      startDate: startDate,
      endDate: endDate,
    });
    await newBooking.save();

    // Update user's booked array
    const user = await Users.findByIdAndUpdate(
      req.user.id,
      { $push: { booked: newBooking._id } },
      { new: true }
    );

    res.send({
      success: true,
      message: "Payment successful and Aama booked successfully",
      data: {
        transactionId: transactionId,
        user: user,
      },
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createBooking,
  getAllBookings,
  deleteBookingById,
  makePayment
};