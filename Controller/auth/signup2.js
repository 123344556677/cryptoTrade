const { BadRequestError } = require('../../errors')
const User = require('../../models/User')
const TeamCommunity = require('../../models/TeamCommunity')
const base64Img = require('base64-img');
const { generateUniqueReferralCode } = require('../../HelpingFunctions/nodemailer')

const signup2 = async (req, res) => {
    const { fname, lname, email, password, referralCode, fundPassword, frontId, backId } = req.body;

    // Generate a unique referral code
    const myReferral = await generateUniqueReferralCode();

    //New User Created
    const newUser = new User({ fname, lname, email, password, referralCode, fundPassword, myReferral, frontId, backId })

    //JWT
    const token = newUser.createToken()

    //await newUser.save() // Will check email exist and other multiple error then we use referral code

    const newMetrics = new TeamCommunity({ userId: newUser._id });
    await newMetrics.save();

    if (referralCode) {
            const referrer = await User.findOne({ myReferral: referralCode });
            if (referrer) {
                newUser.referrer = referrer._id; // Set the referrer
                await newUser.save(); // Save the new user

                // Update referrer's directReferrals
                referrer.directReferrals.push(newUser._id);
                await referrer.save();

                // Update referrer's TeamCommunity
                let referrerMetrics = await TeamCommunity.findOne({ userId: referrer._id });
                if (!referrerMetrics) {
                    referrerMetrics = new TeamCommunity({ userId: referrer._id });
                }
                referrerMetrics.totalPeople += 1;
                referrerMetrics.newRegistration += 1;
                await referrerMetrics.save();

                // Update original referrer's indirectReferrals if exists
                if (referrer.referrer) {
                    const originalReferrer = await User.findById(referrer.referrer);
                    if (originalReferrer) {
                        originalReferrer.indirectReferrals.push(newUser._id);
                        await originalReferrer.save();

                        // Update original referrer's TeamCommunity
                        let referrerMetrics2 = await TeamCommunity.findOne({ userId: originalReferrer._id });
                        if (!referrerMetrics2) {
                            referrerMetrics2 = new TeamCommunity({ userId: originalReferrer._id });
                        }
                        referrerMetrics2.totalPeople += 1;
                        referrerMetrics2.newRegistration += 1;
                        await referrerMetrics2.save();

                        // Update second-level referrer's indirectReferrals if exists
                        if (originalReferrer.referrer) {
                            const secondLevelReferrer = await User.findById(originalReferrer.referrer);
                            if (secondLevelReferrer) {
                                secondLevelReferrer.indirectReferrals.push(newUser._id);
                                await secondLevelReferrer.save();

                                // Update second-level referrer's TeamCommunity
                                let referrerMetrics3 = await TeamCommunity.findOne({ userId: secondLevelReferrer._id });
                                if (!referrerMetrics3) {
                                    referrerMetrics3 = new TeamCommunity({ userId: secondLevelReferrer._id });
                                }
                                referrerMetrics3.totalPeople += 1;
                                referrerMetrics3.newRegistration += 1;
                                await referrerMetrics3.save();
                            }
                        }
                    }
                }
            } else {
                throw new BadRequestError('Invalid referral code');
            }
    } else {
        await newUser.save(); // Save the new user if no referral code is provided
    }


    const data = { ...newUser.toObject(), token }

    res.status(201).json({ status: 'success', data, message: 'Created a Account Successfully' })
}


module.exports = { signup2 }

