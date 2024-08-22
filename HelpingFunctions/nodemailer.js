const User = require('../models/User');
const TeamCommunity = require('../models/TeamCommunity');
const EarningsHistory = require('../models/EarningsHistory');

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

//  // Distribute referral bonuses
//  const distributeReferralBonus = async (user, amount) => {
//     let referrer = await User.findById(user.referrer);
//     if (referrer) {
//         const referrerBonus = amount * 0.05; // 5%
//         referrer.balance += referrerBonus;
//         await referrer.save();
//         console.log('Updated for 5');

//         let referrer2 = await User.findById(referrer.referrer);
//         if (referrer2) {
//             const referrer2Bonus = amount * 0.03; // 3%
//             referrer2.balance += referrer2Bonus;
//             await referrer2.save();

//             console.log('Updated for 3');

//             let referrer3 = await User.findById(referrer2.referrer);
//             if (referrer3) {
//                 const referrer3Bonus = amount * 0.01; // 1%
//                 referrer3.balance += referrer3Bonus;
//                 await referrer3.save();

//                 console.log('Updated for 1');
//             }
//         }
//     }
// };

//SECOND ONe

const distributeReferralBonus = async (user, amount) => {
    const uid = user._id

    // Check if the user has any SenderId in EarningsHistory
    const hasEarnings = await EarningsHistory.exists({ senderUserId: uid });

    let referrer = await User.findById(user.referrer);
    if (referrer) {
        const referrerBonus = amount * 0.03; // 3%
        referrer.balance += referrerBonus;
        await referrer.save();
        console.log('Updated for 5');

        // Update TeamCommunity metrics for referrer
        let referrerMetrics = await TeamCommunity.findOne({ userId: referrer._id });
        if (!referrerMetrics) {
            referrerMetrics = new TeamCommunity({ userId: referrer._id });
        }
        referrerMetrics.totalRevenue += referrerBonus;
        referrerMetrics.addedRecharge += amount;
        if (!hasEarnings) {
            referrerMetrics.newRegistration -= 1
        }
        await referrerMetrics.save();

        // Create EarningsHistory record for referrer
        const earningsHistory = new EarningsHistory({
            senderUserId: user._id,
            receiverUserId: referrer._id,
            amount: referrerBonus
        });
        await earningsHistory.save();

        let referrer2 = await User.findById(referrer.referrer);
        if (referrer2) {
            const referrer2Bonus = amount * 0.02; // 2%
            referrer2.balance += referrer2Bonus;
            await referrer2.save();
            console.log('Updated for 3');

            // Update TeamCommunity metrics for referrer2
            let referrer2Metrics = await TeamCommunity.findOne({ userId: referrer2._id });
            if (!referrer2Metrics) {
                referrer2Metrics = new TeamCommunity({ userId: referrer2._id });
            }
            referrer2Metrics.totalRevenue += referrer2Bonus;
            referrer2Metrics.addedRecharge += amount;
            if (!hasEarnings) {
                referrer2Metrics.newRegistration -= 1
            }
            await referrer2Metrics.save();

            // Create EarningsHistory record for referrer2
            const earningsHistory2 = new EarningsHistory({
                senderUserId: user._id,
                receiverUserId: referrer2._id,
                amount: referrer2Bonus
            });
            await earningsHistory2.save();

            let referrer3 = await User.findById(referrer2.referrer);
            if (referrer3) {
                const referrer3Bonus = amount * 0.01; // 1%
                referrer3.balance += referrer3Bonus;
                await referrer3.save();
                console.log('Updated for 1');

                // Update TeamCommunity metrics for referrer3
                let referrer3Metrics = await TeamCommunity.findOne({ userId: referrer3._id });
                if (!referrer3Metrics) {
                    referrer3Metrics = new TeamCommunity({ userId: referrer3._id });
                }
                referrer3Metrics.totalRevenue += referrer3Bonus;
                referrer3Metrics.addedRecharge += amount;
                if (!hasEarnings) {
                    referrer3Metrics.newRegistration -= 1;
                }
                await referrer3Metrics.save();

                // Create EarningsHistory record for referrer3
                const earningsHistory3 = new EarningsHistory({
                    senderUserId: user._id,
                    receiverUserId: referrer3._id,
                    amount: referrer3Bonus
                });
                await earningsHistory3.save();
            }
        }
    }
};


module.exports = { generateRandomCode, generateUniqueReferralCode, distributeReferralBonus }