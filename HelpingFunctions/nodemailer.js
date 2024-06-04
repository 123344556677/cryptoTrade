const User = require('../models/User');

const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
};



// Function to generate a random string of specified length
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

// Function to generate a unique referral code
const generateUniqueReferralCode = async () => {
    let referralCode;
    let isUnique = false;

    while (!isUnique) {
        referralCode = generateRandomString(8); // Adjust length as needed
        const existingUser = await User.findOne({ myReferral: referralCode });
        if (!existingUser) {
            isUnique = true;
        }
    }

    return referralCode;
};

 // Distribute referral bonuses
 const distributeReferralBonus = async (user, amount) => {
    let referrer = await User.findById(user.referrer);
    if (referrer) {
        const referrerBonus = amount * 0.05; // 5%
        referrer.balance += referrerBonus;
        await referrer.save();
        console.log('Updated for 5');

        let referrer2 = await User.findById(referrer.referrer);
        if (referrer2) {
            const referrer2Bonus = amount * 0.03; // 3%
            referrer2.balance += referrer2Bonus;
            await referrer2.save();

            console.log('Updated for 3');

            let referrer3 = await User.findById(referrer2.referrer);
            if (referrer3) {
                const referrer3Bonus = amount * 0.01; // 1%
                referrer3.balance += referrer3Bonus;
                await referrer3.save();

                console.log('Updated for 1');
            }
        }
    }
};


module.exports = { generateRandomCode, generateUniqueReferralCode, distributeReferralBonus }