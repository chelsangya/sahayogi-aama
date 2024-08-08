const { validationResult } = require('express-validator');
const contact = require("../model/contactModel");

const createContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, number, message } = req.body;
    if (!email || !name || !number || !message) {
        return res.json({
            success: false,
            message: "All fields are required !!"
        });
    }

    try {
        const newContactList = new contact({
            name: name,
            email: email,
            number: number,
            message: message
        });
        await newContactList.save();
        res.status(200).json({
            success: true,
            message: "Submitted successfully !!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong !!"
        });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const list = await contact.find().sort({ _id: -1 });
        res.status(200).json({
            success: true,
            message: "Contacts Fetched",
            contact: list
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    createContact,
    getAllContacts
};
