//Edit fname, lname, email, fundPassword

const { NotFoundError } = require("../../errors")
const User = require("../../models/User")
const validateWalletAddress = require('../../HelpingFunctions/validateWalletAddress')

const updateInformation = async (req, res) => {

    const id = req.user.userId;

    const user = await User.findById(id)

    if (!user) {
        throw new NotFoundError('User not Found!')
    }

    //Checking walletAddress if available
    const { walletAddress } = req.body

    if (walletAddress) {
        await validateWalletAddress(walletAddress);
    }

    const fieldsToUpdate = ['fname', 'lname', 'email', 'fundPassword', 'walletAddress'];

    fieldsToUpdate.forEach(field => {
        if (req.body[field]) {
            user[field] = req.body[field];
        }
    });

    await user.save()

    res.send({ status: 'success', user })
}


module.exports = { updateInformation }
