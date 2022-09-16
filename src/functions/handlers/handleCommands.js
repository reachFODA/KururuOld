const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const comamndsFolders = fs.readdirSync("./src/commands");
        for (const folder of comamndsFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith('js'));

            const { commands, commandArray } = client
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        const clientID = "1020075340892221491";
        const guildID = "968652327290544148";
        const rest = new REST({ version: 9 }).setToken(process.env.TOKEN);

        try {
            console.log("Iniciado atualização do aplicativo (/) comandos.");

            await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
                body: client.commandArray,
            });

            console.log("Todos os aplicativos foram atualizados (/)")
        } catch (error) {
            console.error(error)
        }
    };
};