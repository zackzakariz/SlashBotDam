const { Client } = require("discord.js")
const mongoose = require("mongoose");
const { DatabaseUrl } = require("../../Structures/config.json");

module.exports = {
    name: "ready",
    once: "true",
    /**
     * param{Client} client
     */
    execute(client) {
        console.log("The client is now ready");
        client.user.setActivity("BOT MASIH DALAM PERCUBAAN HARAP BERSABAR!", {type: "PLAYING"})

        if(!DatabaseUrl) return;
        mongoose.connect(DatabaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the database!")
        }).catch((err) => {
            console.log(err)
        });

        require("../../Systems/ChatFilterSys")(client);
    }
}