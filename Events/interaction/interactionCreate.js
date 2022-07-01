const { Client, CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(Interaction, client) {
        if(Interaction.isCommand() || Interaction.isContextMenu()) {
            const command = client.commands.get(Interaction.commandName);
            if(!command) return Interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔ An error occured while running rhis command.")
            ]}) && client.commands.delete(Interaction.commandName);

            command.execute(Interaction, client)
        }
    }
}