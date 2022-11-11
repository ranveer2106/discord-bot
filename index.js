// const { REST, Routes } = require('discord.js');
// const fetch = require("node-fetch")
// require("dotenv").config();
// import { DotenvConfigOptions } from "dotenv"
// const DotenvConfigOptions = "dotenv"
// const fetch = require('node-fetch');

// https://api.nasa.gov/planetary/apod?api_key=Npz06Kczc6QKw0iCMDmWcrliedHxMkuN7OhFVt30
// https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=bf82ff9da74c44f28d77cb72534ca2ce


import { REST, Routes } from 'discord.js';
import fetch from 'node-fetch';
import * as dotenv from "dotenv";
dotenv.config();


const sadWords = ["sad", "depress", "unhappy", "angry"]

const encouragements = ["cheer up", "hang in there", " you are brave"]

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'inspire',
        description: 'send an inspirational quote',
    },

];

const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands('1038677717375258636'), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

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
});

const getQuote = () => {
    return fetch("https://zenquotes.io/api/random")
        .then(res => { return res.json() })
        .then(data => { return data[0]["q"] + "-" + data[0]["a"] })
}

const anime = () => {
    return fetch('https://animechan.vercel.app/api/random')
        .then(response => { return response.json() })
        .then(quote => { return `from ${quote["anime"]} "${quote["quote"]}" by ${quote["character"]}` })
}
const GOT = () => {
    return fetch('https://api.gameofthronesquotes.xyz/v1/random')
        .then(response => { return response.json() })
        .then(quote => { return `"${quote["sentence"]}" by ${quote["character"]["name"]}` })
}
const yomamma = () => {
    return fetch('https://yomomma-api.herokuapp.com/jokes')
        .then(response => { return response.json() })
        .then(quote => { return `${quote["joke"]}` })
}
const Dark = () => {
    return fetch('https://v2.jokeapi.dev/joke/Dark?type=single')
        .then(response => { return response.json() })
        .then(quote => { return `${quote["joke"]}` })
}
const coffee_image = () => {
    return fetch('https://coffee.alexflipnote.dev/random.json')
        .then(response => { return response.json() })
        .then(link => { return `${link["file"]}` })
}




client.on('interactionCreate', async interaction => {

    // if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
        // await interaction.followUp('fuc');
        // await interaction.deleteReply();
    }
    else if (interaction.commandName === 'inspire') {

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

    let pop = msg.author

    if (msg.content === "$inspire") {
        await getQuote().then(async quote => { await msg.channel.send(`${msg.author} ${quote}`); })
    }
    else if (msg.content === "anime") {
        await anime().then(async quote => { await msg.channel.send(`${msg.author} ${quote}`); })
    }
    else if (msg.content === "yomamma") {
        await yomamma().then(async quote => { await msg.channel.send(`${msg.author} ${quote}`); })
    }
    else if (msg.content === "joke") {
        await Dark().then(async quote => { await msg.channel.send(`${msg.author} ${quote}`); })
    }
    else if (msg.content === "$got") {
        await GOT().then(async quote => { await msg.channel.send(`${msg.author} ${quote}`); })
    }
    else if (msg.content === "ping") {
        msg.channel.send(`pong`);
    }
    else if (msg.content === "$image") {
        await coffee_image().then(async link => {
            await msg.channel.send("Here's a random coffee image");
            await msg.channel.send({ files: [`${link}`] });
        })
    }

    else if (sadWords.some(word => msg.content.includes(word))) {
        const encourage = encouragements[Math.floor(Math.random() * encouragements.length)]
        await msg.reply(encourage)
    }
    else if (msg.guild) {
        msg.channel.send(`${pop} i love ${msg.content}`);
    }

})


client.login(process.env.token);