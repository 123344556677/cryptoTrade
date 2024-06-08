const User = require('../../models/User');
const TeamCommunity = require('../../models/TeamCommunity');
const EarningsHistory = require('../../models/EarningsHistory');
const { NotFoundError } = require('../../errors');

const getTeamData = async (req, res) => {
    const userId = req.user.userId;

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    // Fetch TeamCommunity data for the user
    const teamCommunityData = await TeamCommunity.findOne({ userId });
    if (!teamCommunityData) {
        throw new NotFoundError('Team community data not found');
    }

     // Calculate today's earnings using UTC-based date calculations
     const startOfDay = new Date();
     startOfDay.setUTCHours(0, 0, 0, 0);
     const endOfDay = new Date(startOfDay);
     endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);
 
     // Find the matched records within the date range
     const matchedRecords = await EarningsHistory.find({
         receiverUserId: userId,
         createdAt: { $gte: startOfDay, $lt: endOfDay }
     });
 
     // Calculate the total earnings today by summing the amounts
     const earningsToday = matchedRecords.reduce((sum, record) => sum + record.amount, 0);

    // Prepare the response data
    const data = {
        totalRevenue: teamCommunityData.totalRevenue,
        totalPeople: teamCommunityData.totalPeople,
        newRegistrations: teamCommunityData.newRegistration,
        addedRecharge: teamCommunityData.addedRecharge,
        earningsToday
    };

    res.status(200).json({ status: 'success', data });
};

module.exports = { getTeamData };
