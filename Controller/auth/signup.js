const { BadRequestError } = require('../../errors')
const User = require('../../models/User')

const signup = async (req, res) => {
    const { fname, lname, email, password, referralCode } = req.body;

    const newUser = new User({ fname, lname, email, password, referralCode })

    //MULTER ERROR CHECK

    if (!req.files) {
        throw new BadRequestError('No file provided');
    }
    
    //Multer
    const imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

    newUser.cnic.front = imageUrls[0]
    newUser.cnic.back = imageUrls[1]

    const token = newUser.createToken()

    await newUser.save()

    const data = {...newUser.toObject(),token}

    res.status(201).json({ status: 'success', data })
}


module.exports = { signup }

