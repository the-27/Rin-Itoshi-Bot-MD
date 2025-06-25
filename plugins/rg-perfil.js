import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    }

    let user = global.db.data.users[userId];

    let name = conn.getName(userId);
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let pareja = user.marry || 'Nadie';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Sin Rango';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;

    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    let profileText = `
=͟͟͞͞ ✿  *𝖯𝖾𝗋𝖿𝗂𝗅 𝖽𝖾𝗅 𝖴𝗌𝗎𝖺𝗋𝗂𝗈  ←╮*
╰ ࣪ ˖ ∿ @${userId.split('@')[0]}◤

*╭═══•|.🥥.|•════•|.🥞.|•═══╮*
║ ❀ *N᥆mᑲrᥱ:* ${name}	
║ ❖ *Eძᥲძ:* ${user.age || 'Desconocida'}
║ ❀ *Cᥙm⍴ᥣᥱᥲᥒ̃᥆s:* ${cumpleanos}
║ ⚥ *Gᥱᥒᥱr᥆:* ${genero}
║ ♡ *Cᥲsᥲძ@:* ${pareja}
║ ❁ *⍴rᥱmіᥙm:* ${user.premium ? '✅' : '❌'}
║ ✎ *Dᥱsᥴrі⍴ᥴі᥆́ᥒ:* ${description}
*╰═══•|.🌴.|•════•|.📚.|•═══╯*

 *╔═════.°ஜ۩.🎨.۩ஜ°.═════╗*
     ★ 🅡̣̣̣-🅔̣̣̣-🅒̣̣̣-🅤̣̣̣-🅡̣̣̣-🅢̣̣̣-🅞̣̣̣-🅢̣̣̣꙰⃟⸙.li
 *╚═════.°ஜ۩.⭐.۩ஜ°.═════╝*
╭─┉─ •     🅤🅢🅔🅡 •
│◭ *E᥊⍴ᥱrіᥱᥒᥴіᥲ:* ${exp.toLocaleString()}
│◭ *ᥒі᥎ᥱᥣ:* ${nivel}
│⚡︎ *Rᥲᥒg᥆:* ${role}
╰▭▬▭▬▭▬▭▬▭▬▭▬▭╯

*╔═══〔 👾 𝙄𝙉𝙁𝙊 🥥 〕═══╗*
║ ⛁ *ᥴ᥆іᥒs ᥴᥲr𝗍ᥱrᥲ:* ${coins.toLocaleString()} ${moneda}
║ ⛃ *ᥴ᥆іᥒs ᑲᥲᥒᥴ᥆:* ${bankCoins.toLocaleString()} ${moneda}
*╚═══════════════════╝*
   𓄲⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉⩉𓄴
> *🥞 ⍴ᥲrᥲ ᥱძі𝗍ᥲr 𝗍ᥙ ⍴ᥱr𝖿іᥣ ᥙsᥲ #perfildates*
  `.trim();

    await conn.sendMessage(m.chat, { 
        text: profileText,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '✧★᭄ꦿ᭄ꦿ𝐏𝐄𝐑𝐅𝐈𝐋 𝐃𝐄 𝐔𝐒𝐔𝐀𝐑𝐈𝐎★᭄ꦿ᭄ꦿ✧',
                body: dev,
                thumbnailUrl: perfil,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;
