const favourite = require("../model/favouriteModel");
const users = require("../model/userModel");

const createFavourite = async (req, res) => {
    const userId = req.user.id;
    const { aamaId } = req.body;

    try {
        const newFavourite = new favourite({
            by: userId,
            to: aamaId,
        });

        await newFavourite.save();

        await users.findByIdAndUpdate(
            userId,
            { $push: { favourite: newFavourite._id } },
            { new: true }
        );

        res.status(200).json({success: true, message: 'Added to favourites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal Server Error' });
    }
};

const getFavList = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.json({
                success: false,
                message: 'User not found',
            });
        }

        const favDetail = await favourite.find({
            by: req.user.id,
        }).populate('to')

        res.json({
            success: true,
            fav: favDetail,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
}

const removeFav = async (req, res) => {
    const id = req.params.id;
    try {
        await favourite.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Remove from Favorites Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

module.exports = {
    createFavourite,
    getFavList,
    removeFav
};
