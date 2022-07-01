const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "voice",
    description: "Control your own channel",
    options: [
        {
            name: "invite",
            type: "SUB_COMMAND",
            description: "Invite some friend to your voice, Kroni siak tak voice dengan yang lain",
            options: [
                {
                    name: "member",
                    type: "USER",
                    required: true,
                    description: "Choose your member to invite to your voice Macam aku kata la Kroni"
                }
            ]
        },
        {
            name: "disallow",
            type: "SUB_COMMAND",
            description: "Remove someone access to the channel channel",
            options: [
                {  
                    name: "member",
                    type: "USER",
                    required: true,
                    description: "Choose your member to invite to your voice Macam aku kata la Kroni"
                }
            ]
        },
        {
            name: "name",
            type: "SUB_COMMAND",
            description: "You can change your channel name ikut suka hang la nak ganti nama apa",
            options: [
                {
                    name: "text",
                    type: "STRING",
                    required: true,
                    description: "Provide the name"
                }
            ]
        },
        {
            name: "public",
            type: "SUB_COMMAND",
            description: "Make your channel to public, bagus dia dah tak Kroni saya suka-saya suka",
            options: [
                {
                    name: "turn",
                    type: "STRING",
                    required: true,
                    description: "turn on or off",
                    choices: [
                        {name: "on", value : "on"},
                        {name: "off", value : "off"}
                    ]
                }
            ]
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { options, member, guild } = interaction;

        const subCommand = options.getSubcommand();
        const voiceChannel = member.voice.channel;
        const Embed = new MessageEmbed().setColor("GREEN");
        const ownedChannel = client.voiceGenerator.get(member.id);

        if(!voiceChannel)
        return interaction.reply({embeds: [Embed.setDescription("You are not in a voice Channel").setColor("RED")]});

        if(!ownedChannel || voiceChannel.id !== ownedChannel)
        return interaction.reply({embeds: [Embed.setDescription("You do not own this or any channel").setColor("RED")], ephemeral: true});

        switch(subCommand) {
            case "name" : {
                const newName = options.getString("text");
                if(newName.length > 22 || newName.length < 1)
                return interaction.reply({embeds: [Embed.setDescription("Name Cannot exceed the 22 character limit hang nak tulis panjang panjang buat apa?").setColor("RED")], ephemeral: true})

                voiceChannel.edit({ name: newName });
                interaction.reply({embeds: [Embed.setDescription(`Channel name has been set to ${newName}`)], ephemeral: true})
            }
            break;
            case "invite" : {
                const targetMember = options.getMember("member");
                voiceChannel.permissionOverwrites.edit(targetMember, {CONNECT: true});

                targetMember.send({embeds: [Embed.setDescription(`${member} has invited you to <#${voiceChannel.id}>`)]});
                interaction.reply({embeds: [Embed.setDescription(`${targetMember} Kroni siot invite kawan dia ja`)]});

            }
            break;
            case "disallow" : {
                const targetMember = options.getMember("member");
                voiceChannel.permissionOverwrites.edit(targetMember, {CONNECT: false});

                if(targetMember.voice.channel && targetMember.voice.channel.id == voiceChannel.id) targetMember.voice.setChannel(null);
                interaction.reply({embeds: [Embed.setDescription(`${targetMember} has been removed from this channel`)], ephemeral: true});

            }
            break;
            case "public" : {
                const turnChoice = options.getString("turn");
                switch(turnChoice) {
                    case "on": {
                        voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: null});
                        interaction.reply({embeds: [Embed.setDescription("The channel is now public")], ephemeral: true})
                    }
                }

            }
            break;
            case "off": {
                voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: false});
                interaction.reply({embeds: [Embed.setDescription("The channel is now closed")], ephemeral: true})
            }
        }
    }
}