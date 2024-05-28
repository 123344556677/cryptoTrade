const User = require('../../models/User')

const getUser = async (req, res) => {

    const id = req.params.userId

    const user = await User.findById(id);

    res.status(200).json({ status: 'success', user });

};

module.exports = { getUser }