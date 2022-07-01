const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;

        const Welcomer = new WebhookClient({
            id: "953668862413537350",
            token: "8PJG8TjvYowjfQiz8_0feivxSecHO_JmDobSiZbJ8ORzyS1tnX5JF5b0hXR6J7NhcSZD"
        });

        const Welcome = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor({
            name: user.tag, 
            iconURL: user.avatarURL({dynamic: true, size: 512})
          })
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Welcome ${member} to the **${guild.name}**!\nAccount Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
        .setFooter({text: `ID: ${user.id}`})

        Welcomer.send({embeds: [Welcome]})
    }
}
//https://discord.com/api/webhooks/953668862413537350/8PJG8TjvYowjfQiz8_0feivxSecHO_JmDobSiZbJ8ORzyS1tnX5JF5b0hXR6J7NhcSZD