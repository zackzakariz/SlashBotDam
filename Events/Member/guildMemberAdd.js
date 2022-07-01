const { MessageEmbed, WebhookClient, GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
      const { user, guild } = member;


        const Welcomer = new WebhookClient({
            id: "953685038548004864",
            token: "NU1XaAyauHEIBnWdDVOlIrTZ_Bg5yAPECes185G5wFer0Ribly-Ynip0Y1XRQUeLHAXt"
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

//https://discord.com/api/webhooks/953685038548004864/NU1XaAyauHEIBnWdDVOlIrTZ_Bg5yAPECes185G5wFer0Ribly-Ynip0Y1XRQUeLHAXt