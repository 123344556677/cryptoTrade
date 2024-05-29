const User = require('../../models/User')

const deleteUser = async (req, res) => {

    const id = req.params.userId

    await User.findByIdAndDelete(id);

    res.status(200).json({ status: 'success', message:'Successfully Delete the Account' });

};

module.exports = { deleteUser }