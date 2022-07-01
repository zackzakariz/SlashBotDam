const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Message} message
     */
    execute(message) {
        if(message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📕 a [message](${message.url}) by ${message.author.tag} was **deleted**.\n**Deleted Message:**\n ${message.content ? message.content : "None"}`.slice(0, 4096))

        if(message.attachments.size >= 1) {
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({url: "https://discord.com/api/webhooks/953685038548004864/NU1XaAyauHEIBnWdDVOlIrTZ_Bg5yAPECes185G5wFer0Ribly-Ynip0Y1XRQUeLHAXt"}).send({embeds: [Log]}).catch((err) => {  console.log(err)});
    }
}
