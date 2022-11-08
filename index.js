// const { REST, Routes } = require('discord.js');

import { REST, Routes } from 'discord.js';

// const fetch = require("node-fetch")
import fetch from 'node-fetch';

// require("dotenv").config();

// import { DotenvConfigOptions } from "dotenv"

import * as dotenv from "dotenv";
dotenv.config();

// const DotenvConfigOptions = "dotenv"

// const fetch = require('node-fetch');

const sadWords = ["sad", "depress", "unhappy", "angry"]

const encouragements = ["cheer up", "hang in there", " you are brave"]

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'inspire',
        description: 'Replies with Pong!2',
    },

];

// const rest = new REST({ version: '10' }).setToken('MTAzODY3NzcxNzM3NTI1ODYzNg.G5sNv1.IbipB1iBC6t_c8GezdSl03JhQd9Q-DBIyPa-Us');

// (async () => {
//     try {
//         console.log('Started refreshing application (/) commands.');

//         await rest.put(Routes.applicationCommands('1038677717375258636'), { body: commands });

//         console.log('Successfully reloaded application (/) commands.');
//     } catch (error) {
//         console.error(error);
//     }
// })();

// const { Client, GatewayIntentBits } = require('discord.js');

import { Client, GatewayIntentBits, Partials } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent]
    ,
    // partials: [Partials.Channel],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("you log")
});

const getQuote = () => {
    return fetch("https://zenquotes.io/api/random")
        .then(res => {
            return res.json()
        })
        .then(data => {
            return data[0]["q"] + "-" + data[0]["a"]
        })
}


client.on('interactionCreate', async interaction => {
    console.log("you")
    // interaction.reply("fuxk")
    // interaction.reply("fuxk")
    // interaction.channel.send(`@${interaction.author}`)
    // if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pongooooooooooooooo!');
        // await interaction.followUp('fuc');
        // await interaction.deleteReply();
    }
    // else if (interaction.guildId === "yo") {
    // await interaction.reply("gild")
    // }
    else if (interaction.commandName === 'inspire') {
        // await interaction.reply('2Pongooooooooooooooo!');
        // await interaction.reply(`@${interaction.author}`)
        await getQuote().then(async quote => {
            // await interaction.channel.send(quote)
            await interaction.reply(quote)
        })
    }
    else if (interaction.message === "hello") {
        await interaction.reply('lololololo');
    }
});

client.on("messageCreate", async msg => {

    if (msg.author.bot) return;

    // let mention = msg.mentions.author()
    // const user = msg.mentions.users.first();
    // message.channel.send(`${user} //code`
    // console.log(user)

    let pop = msg.author

    if (msg.content === "$inspire") {
        await getQuote().then(async quote => {
            // await interaction.channel.send(quote)
            // await interaction.reply(quote)
            await msg.channel.send(`${msg.author} ${quote}`);
        })
    }
    else if (msg.content === "ping") {
        msg.channel.send(`pong`);
    }

    else if (msg.guild) {
        console.log("yo")
        msg.channel.send(`${pop} i love ${msg.content}`);
    }
    // if (sadWords.some(word => msg.content.includes(word))) {
    //     const encourage = encouragements[Math.floor(Math.random() * encouragements.length)]
    //     await msg.reply(encourage)
    // }

})


client.login(process.env.token);