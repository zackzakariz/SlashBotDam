const { Message, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/AFKsystem");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message 
     */
    async execute(message) {
        if(message.author.bot) return;

        //await DB.deleteOne({GuildID: message.guild.id, UserID: message.user.id});

        if(message.mentions.members.size) {
            const Embed = new MessageEmbed()
            .setColor("RED");
            message.mentions.members.forEach((m) => {
                DB.findOne({GuildID: message.guild.id, UserID: m.id}, async (err, data) => {
                    if(err) throw err;
                    if(data)
                   return message.reply({embeds: [Embed.setDescription(`${m} went Afk <t:${data.Time}:R>\n **Status**: ${data.Status}`)]});
                })
            })
        }
    }
}