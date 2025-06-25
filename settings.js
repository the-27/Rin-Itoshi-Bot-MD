import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 573218138672

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['51969214380', '🜲 Propietario 🜲', true],
  ['51994114690'],
  ['51919199620'],
  ['51988013368'], 
  
// <-- Número @lid -->
  ['117094280605916', 'black', true],
  ['258892692984006', 'DevAlexJs', true], 
  ['52772 1892735', ' no ase nd', true]
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['51969214380'] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.0'
global.nameqr = '𝒓𝒊𝒏 𝒊𝒕𝒐𝒔𝒉𝒊'
global.namebot = '✿◟𝒓𝒊𝒏 𝒊𝒕𝒐𝒔𝒉𝒊 𝒃𝒐𝒕◞✿'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.blackJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '🦠 𝐑𝐈𝐍•- ⃝𝐈𝐓𝐎𝐒𝐇𝐈 𝐁𝐎𝐓 𝐌𝐃𝄟 ⚡'
global.botname = ' ✦⃟⛧ _𝑹𝑰𝑵 𝑰𝑻𝑶𝑺𝑯𝑰⛧ 𝑩𝑶𝑻_ 🤖┋⃟✧'
global.wm = 'ᬊᬁ࿔᭄ྀ𝑰𝑻𝑶𝑺𝑯𝑰 ✿ꦿ👾ℬ𝒪𝒯᭄✿'
global.author = 'mᥲძᥱ ᑲᥡ : 🌈ᵀ͢ᴴᴱ𝄟⏤͟͟͞͞⃝Black'
global.dev = '𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮:  ꧁𓊈𒆜𝖙𝖍𝖊•𝒃𝒍𝒂𝒄𝒌𒆜𓊉꧂'
global.bot = '𝚁𝙸𝙽 𝙸𝚃𝙾𝚂𝙷𝙸'
global.textbot = '「 ⚽ 𝐑𝐈𝐍 𝐈𝐓𝐎𝐒𝐇𝐈 - 𝐁𝐎𝐓 🌴 」• 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 ꧁⟣٭𝖙𝖍𝖊_𝚋𝚕𝚊𝚌𝚔٭⟢꧂'
global.etiqueta = '٭𝚋𝚕𝚊𝚌𝚔٭'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = 'coins'
global.welcom1 = '🥥 𝐄ძі𝗍ᥲ ᥱᥣ ᥕᥱᥣᥴ᥆mᥱ ᥴ᥆ᥒ #sᥱ𝗍ᥕᥱᥣᥴ᥆mᥱ'
global.welcom2 = '🌿 𝐄ძі𝗍ᥲ ᥱᥣ ᥕᥱᥣᥴ᥆mᥱ ᥴ᥆ᥒ #sᥱ𝗍ᑲᥡᥱ'
global.banner = 'https://files.catbox.moe/1ips7f.jpg'
global.avatar = 'https://files.catbox.moe/dr3r2f.jpg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.comunidad1 = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.channel = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.channel2 = 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U'
global.md = 'https://github.com/the-27/Rin-Itoshi-Bot-MD'
global.correo = 'blackoficial2025@gmail.com'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363401008003732@newsletter',
}
global.multiplier = 60

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
