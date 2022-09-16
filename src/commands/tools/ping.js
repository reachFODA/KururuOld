const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Veja o ping do bot'), 

    async execute(interaction, client){
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `:ping_pong: **|** **Lâtencia:** ${Math.round(client.ws.ping)}ms`
        await interaction.editReply({
            content: newMessage
        })

    }
}