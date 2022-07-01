const { MessageEmbed, Message, WebhookClient } = require("discord.js");

module.exports = {
    name: "messageUpdate",
    /**
     * @param {Message} oldMessage
     * @param {Message} newMessage
     */
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return;

        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? " ..." : "")
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? " ..." : "")

        const Log = new MessageEmbed()
        .setColor("#36393f")
        .setDescription(`📘 a [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}.\n **Original**:\n [ ${Original} ] \n**Edited**:\n [ ${Edited} ]`)
        .setFooter({text: `Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}`});

        new WebhookClient({url : "https://discord.com/api/webhooks/953668862413537350/8PJG8TjvYowjfQiz8_0feivxSecHO_JmDobSiZbJ8ORzyS1tnX5JF5b0hXR6J7NhcSZD"}).send({embeds: [Log]}).catch((err) => console.log(err));
    }
}