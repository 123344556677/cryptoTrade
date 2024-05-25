const authRoutes = require("../Modules/Auth/Auth.routes");

const rechargeRoutes = require ("../Modules/Recharge/Recharge.Routes");

const addwalletRoutes = require ("../Modules/AddWallet/AddWallet.Route");

const aboutRoutes = require ("../Modules/About/About.Route");

const announcementRoutes = require ("../Modules/Announcement/Announcement.Route");

const witdarwalRoutes = require ("../Modules/Witdarwal/Witdarwal.Route");

const wwhatsappRoutes = require ("../Modules/Whatsapp/Whatsapp.Route");

const walladdressRoutes = require ("../Modules/Wallet/Wallet.Route");


module.exports = function router(app) {
    app
      // Auth routes
      .use("/api/v1/auth", authRoutes)

      .use("/api/v1/recharge", rechargeRoutes)

      .use("/api/v1/addwallet", addwalletRoutes)

      .use("/api/v1/about", aboutRoutes)

      .use("/api/v1/announcements", announcementRoutes)

      .use("/api/v1/witdawarl", witdarwalRoutes)

      .use("/api/v1/whatsapp", wwhatsappRoutes)

      .use("/api/v1/walletaddress", walladdressRoutes)
  
  };