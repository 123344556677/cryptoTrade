const { BadRequestError } = require('../../errors')
const User = require('../../models/User')
const { generateUniqueReferralCode } = require('../../HelpingFunctions/nodemailer')

const signup = async (req, res) => {
    const { fname, lname, email, password, referralCode, fundPassword } = req.body;

    // Generate a unique referral code
    const myReferral = await generateUniqueReferralCode();

    //New User Created
    const newUser = new User({ fname, lname, email, password, referralCode, fundPassword, myReferral })

    //MULTER ERROR CHECK

    if (!req.files) {
        throw new BadRequestError('No file provided');
    }

    //Multer
    const imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

    newUser.frontId = imageUrls[0]
    newUser.backId = imageUrls[1]

    //JWT
    const token = newUser.createToken()

    await newUser.save() // Will check email exist and other multiple error then we use referral code


    // Referral logic
    if (referralCode) {

        const referrer = await User.findOne({ myReferral: referralCode });
        if (referrer) {
            newUser.referrer = referrer._id; // Set the referrer
            referrer.directReferrals.push(newUser._id); // Add to direct referrals (A)

            await referrer.save();

            // Update the original referrer's indirectReferrals if the new user's referrer has one
            if (referrer.referrer) {
                const originalReferrer = await User.findById(referrer.referrer);
                if (originalReferrer) {
                    originalReferrer.indirectReferrals.push(newUser._id); // Add to indirect referrals (B)
                    await originalReferrer.save();

                    if (originalReferrer.referrer) {
                        const secondLevelReferrer = await User.findById(originalReferrer.referrer);
                        if (secondLevelReferrer) {
                            secondLevelReferrer.indirectReferrals.push(newUser._id); // Add to indirect referrals
                            await secondLevelReferrer.save();
                        }
                    }

                }
            }
        } else {
            throw new BadRequestError('Invalid referral code');
        }
    }

    const data = { ...newUser.toObject(), token }

    res.status(201).json({ status: 'success', data, message: 'Created a Account Successfully' })
}


module.exports = { signup }

