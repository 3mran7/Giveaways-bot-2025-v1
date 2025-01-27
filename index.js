const express = require('express');
const app = express();
const port = 6296;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
const Discord = require("discord.js")
const client = new Discord.Client({intents:[131071]});
const ms = require("ms")
const { GiveawaysManager } = require('discord-giveaways');
const manager = new GiveawaysManager(client, {
    storage: './giveaways.yaml',
    default: {
        botsCanWin: true,
        embedColor: '#793fdf', // لون الايمبد خلال البدء
        embedColorEnd: 'Red', // لون الايمبد بعد انتهاء القيف
        reaction: '<:emoji_1731976153463:1310155101276471409>' // ايموجي القيف اوي
    }
});
client.giveawaysManager = manager;

let oo = ["880010973216387193"] // ايدي حسابات تستعمل البوت
const prefix = "-"//بريفكس البوت
client.on("messageCreate", async message =>{
    if(message.content.startsWith(prefix+"gstart")){
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages))return message.reply("ManageMessages required")
        const args = message.content.split(" ")
        let winners = parseInt(args[2])
        let prize = message.content.split(" ").slice(3).join(" ")
        let time = args[1]
        let embed = new Discord.EmbedBuilder()
        .setColor("793fdf")
        .setDescription(`
Start Like:\n**\`${prefix}start 10s 1 Nitro\`**

**\`10s\`** = Giveaway Time\n**\`1\`** = Winners Count\n**\`Nitro\`** = Giveaway Prize`)
        if(!winners)return message.reply({embeds:[embed]})
        if(!prize)return message.reply({embeds:[embed]})
        if(!time)return message.reply({embeds:[embed]})
        if(ms(time) < 10000){
return message.reply("💥 The duration you provided (1) was shorter than the minimum duration (**10** seconds)!")
        }
        message.delete()
            client.giveawaysManager.start(message.channel, {
                duration: ms(time),
                winnerCount:winners,
                prize:prize,
                messages:{
                giveaway: '🎉🎉 **Giveaway Started** 🎉🎉',
                giveawayEnded: '🎊🎊 **Giveaway End** 🎊🎊',
                title: '{this.prize}',
                drawing: `Ends: {timestamp}\nHosted by: ${message.author}`,
                dropMessage: 'Be the first to react with 🎉 !',
                inviteToParticipate: 'React with 🎉 to participate!',
                winMessage: 'Congratulations, {winners}! You won **{this.prize}** 🎉!\n{this.messageURL}',
                embedFooter: '{this.winnerCount} winner(s)',
                noWinner: 'Giveaway cancelled, no valid participations.',
                winners: 'Winner(s):',
                endedAt: 'Ended at'
             },lastChance: {
                enabled: true,
                content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
                threshold: 40000,
                embedColor: '#FF0000'
            }
            })
    }else
    if(message.content.startsWith(prefix+"reroll")){
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages))return message.reply("ManageMessages required")
        let args = message.content.split(" ")
        if(!args[1])return message.reply("messageId required")
        client.giveawaysManager.reroll(args[1]).then(() => {
            message.reply('Success! Giveaway rerolled!')
        }).catch((err) => {
            message.reply(`An error has occurred, please check and try again.\n\`${err}\``);
        });
    }else
    if(message.content.startsWith(prefix+"end")){
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages))return message.reply("ManageMessages required")
        let args = message.content.split(" ")
        if(!args[1])return message.reply("messageId required")
        client.giveawaysManager.end(args[1]).then(() => {
            message.reply('Success! Giveaway ended!')
            })
            .catch((err) => {
            message.reply(`An error has occurred, please check and try again.\n\`${err}\``);
            });
    }else
    if(message.content.startsWith(prefix+"pause")){
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages))return message.reply("ManageMessages required")
        let args = message.content.split(" ")
        if(!args[1])return message.reply("messageId required")
        client.giveawaysManager.pause(args[1]).then(() => {
            message.reply('Success! Giveaway paused!')
            })
            .catch((err) => {
            message.reply(`An error has occurred, please check and try again.\n\`${err}\``);
            });
    }else
    if(message.content.startsWith(prefix+"unpause")){
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages))return message.reply("ManageMessages required")
        let args = message.content.split(" ")
        if(!args[1])return message.reply("messageId required")
        client.giveawaysManager.unpause(args[1]).then(() => {
            message.reply('Success! Giveaway unpaused!')
            })
            .catch((err) => {
            message.reply(`An error has occurred, please check and try again.\n\`${err}\``);
            });
    }else
    if(message.content.startsWith(prefix+"delete")){
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages))return message.reply("ManageMessages required")
        let args = message.content.split(" ")
        if(!args[1])return message.reply("messageId required")
        client.giveawaysManager.delete(args[1]).then(() => {
            message.reply('Success! Giveaway deleted!')
            })
            .catch((err) => {
            message.reply(`An error has occurred, please check and try again.\n\`${err}\``);
            });
    }else
    if(message.content.startsWith(prefix+"setname")){
        if(!oo.includes(message.author.id))return
        let args = message.content.split(" ").slice(1).join(" ")
        if(!args)return message.reply("New Name required")
        let gg = client.user.setUsername(args).then(() =>{
            message.reply(`Done Changed Name to \`${args}\``)
        })
gg.catch(async err => await message.reply({content:`\`\`\`js

{
    _errors: [
      {
        code: 'BASE_TYPE_BAD_LENGTH',
        message: 'Must be between 2 and 32 in length.'
      }
    ]
  }
\`\`\``}))
    }else
    if(message.content.startsWith(prefix+"setavatar")){
        if(!oo.includes(message.author.id))return
        let args = message.content.split(" ")
        if(!args[1])return message.reply("Avatar Link required")
        let gg = client.user.setAvatar(args[1]).then(() =>{
            message.reply(`Done Changed Avatar to \`${args[1]}\``)
        })
        gg.catch(err => message.reply({content:"Ha? This no a avatar"}))
    }else
    if(message.content.startsWith(prefix + "setstatus")){
        if(!oo.includes(message.author.id))return
        const args = message.content.split(" ").slice(1).join(" ")
        if(!args) return message.reply(`Type New Status\nLike: \`${prefix}setstatus Hi\``)
        message.reply({embeds:[new Discord.EmbedBuilder().setColor("793fdf").setDescription(`[1] Playing
        [2] Listening
        [3] Streaming
        [4] Watching
        [0] Cancel`)]})
        let filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages({ filter, max: 1, time: 90000, errors: ['time'] }).then(collected => {
        if (collected.first().content.toLowerCase() == '1') {
        message.reply({embeds:[new Discord.EmbedBuilder().setDescription('Done Changed to Playing').setColor("793fdf")]})
        client.user.setPresence({status: 'idle',activities: [{name: args,type: Discord.ActivityType.Playing}]})
        } else if (collected.first().content.toLowerCase() == '2') {
        message.reply({embeds:[new Discord.EmbedBuilder().setDescription('Done Changed to Listening').setColor("793fdf")]})
        client.user.setPresence({status: 'idle',activities: [{name: args,type: Discord.ActivityType.Listening}]})
        
        } else if (collected.first().content.toLowerCase() == '3') {
        message.reply({embeds:[new Discord.EmbedBuilder().setDescription('Done Changed to Streaming').setColor("793fdf")]})
        client.user.setPresence({status: 'online',activities: [{name: args,type:Discord.ActivityType.Streaming,url: "https://www.twitch.tv/gg/mayor"}]})
        
        } else if (collected.first().content.toLowerCase() == '4') {
        message.reply({embeds:[new Discord.EmbedBuilder().setDescription('Done Changed to Watching').setColor("793fdf")]})
        client.user.setPresence({status: 'dnd',activities: [{name: args,type:Discord.ActivityType.Watching}]})
        
        } else if (collected.first().content.toLowerCase() == '0') {
        message.reply({embeds:[new Discord.EmbedBuilder().setDescription('Done Deleted').setColor("Red")]})
        }
      })
    }else
    if(message.content.startsWith(prefix+"help")){
let embed = new Discord.EmbedBuilder()
.addFields(
{name:`${prefix}gstart`,value:"\`لانشاء جيف اوي في سيرفرك\`"},
{name:`${prefix}reroll`,value:`\`لاختيار فائز اخر\``},
{name:`${prefix}end`,value:`\`لانهاء الجيف اوي\``},
{name:`${prefix}pause`,value:`\`لايقاف الجيف اوي\``},
{name:`${prefix}unpause`,value:`\`لشتغيل الجيف اوي المتوقف\``},
{name:`${prefix}delete`,value:`\`لمسح جيف اوي\``},
{name:`${prefix}setname`,value:`\`لتحديد اسم البوت\``},
{name:`${prefix}setavatar`,value:`\`لتحديد صورة البوت\``},
{name:`${prefix}setstatus`,value:`\`لتحديد حالة البوت\``},
)
.setColor("793fdf").setThumbnail(message.guild.iconURL({dynamic:true}))
.setAuthor({name:message.author.username,iconURL:message.author.avatarURL({dynamic:true})})
.setFooter({text:"This Bot From MAYOR TEAM",iconURL:client.user.avatarURL()}).setTimestamp()
message.reply({embeds:[embed]})
}
});
client.on('ready', () => {
   console.log(`Logged in as ────────────────────────────────────────────────────────────────────────────────────────────
─██████──────────██████─██████████████─████████──████████─██████████████─████████████████───
─██░░██████████████░░██─██░░░░░░░░░░██─██░░░░██──██░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░░░██───
─██░░░░░░░░░░░░░░░░░░██─██░░██████░░██─████░░██──██░░████─██░░██████░░██─██░░████████░░██───
─██░░██████░░██████░░██─██░░██──██░░██───██░░░░██░░░░██───██░░██──██░░██─██░░██────██░░██───
─██░░██──██░░██──██░░██─██░░██████░░██───████░░░░░░████───██░░██──██░░██─██░░████████░░██───
─██░░██──██░░██──██░░██─██░░░░░░░░░░██─────████░░████─────██░░██──██░░██─██░░░░░░░░░░░░██───
─██░░██──██████──██░░██─██░░██████░░██───────██░░██───────██░░██──██░░██─██░░██████░░████───
─██░░██──────────██░░██─██░░██──██░░██───────██░░██───────██░░██──██░░██─██░░██──██░░██─────
─██░░██──────────██░░██─██░░██──██░░██───────██░░██───────██░░██████░░██─██░░██──██░░██████─
─██░░██──────────██░░██─██░░██──██░░██───────██░░██───────██░░░░░░░░░░██─██░░██──██░░░░░░██─
─██████──────────██████─██████──██████───────██████───────██████████████─██████──██████████─
────────────────────────────────────────────────────────────────────────────────────────────`);
   console.log(`MAYOR SERVER : https://discord.gg/yBTBrffauG 💎`);
   console.log(`MAYOR YouTube : https://youtube.com/@3mran77?  🤍`);
});


client.login('MTMzMjI4ODk3MTU1MTU0MzMxNg.GJAxIr.-u0B-QsqgNToxYrVczaByl54sIj4XP1EU4Glno')