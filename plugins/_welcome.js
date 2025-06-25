// theBlack
import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  const getPais = (numero) => {
    const paisesPorPrefijo = {
      "1": "🇺🇸 Estados Unidos",
      "34": "🇪🇸 España",
      "52": "🇲🇽 México",
      "54": "🇦🇷 Argentina",
      "55": "🇧🇷 Brasil",
      "56": "🇨🇱 Chile",
      "57": "🇨🇴 Colombia",
      "58": "🇻🇪 Venezuela",
      "591": "🇧🇴 Bolivia",
      "593": "🇪🇨 Ecuador",
      "595": "🇵🇾 Paraguay",
      "598": "🇺🇾 Uruguay",
      "502": "🇬🇹 Guatemala",
      "503": "🇸🇻 El Salvador",
      "504": "🇭🇳 Honduras",
      "505": "🇳🇮 Nicaragua",
      "506": "🇨🇷 Costa Rica",
      "507": "🇵🇦 Panamá",
      "51": "🇵🇪 Perú",
      "53": "🇨🇺 Cuba",
      "91": "🇮🇳 India"
    };
    for (let i = 1; i <= 3; i++) {
      const prefijo = numero.slice(0, i);
      if (paisesPorPrefijo[prefijo]) return paisesPorPrefijo[prefijo];
    }
    return "🌎 Desconocido";
  };

  const numeroUsuario = m.messageStubParameters[0].split('@')[0];
  const pais = getPais(numeroUsuario);

  // 🕓 Fecha y hora de Perú
  const fecha = new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima' });
  const hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  };

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');
  let img = await (await fetch(`${pp}`)).buffer();
  let chat = global.db.data.chats[m.chat];
  let txt = ` ⟆⃝༉⃟⸙ ᯽𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎 ࣪˖ ִֶָ📚་`;
  let txt1 = ` ⟆⃝༉⃟⸙ 𝐀 𝐃 𝐈 𝐎 𝐒 ͙࿐`;
  let groupSize = participants.length;
  if (m.messageStubType == 27) groupSize++;
  else if (m.messageStubType == 28 || m.messageStubType == 32) groupSize--;

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `      *╭┈̶̣̣̣̣̄┈̵̣̣̣┈̶̣̣̄┈̵┈̶̣̣̣̣̄┈̵┈̶̣̣̣̣̣̄┈̵┈̶̣̣̣̄┈̵┈̵̣̣̄┈̶┈̵̣̣̣̄┈̶┈̵̣̣̣̣̄┄̶┈̵̣̣̣̣̄┄̶╮*
*˙·.˙··┊ #+#+↷❮ 𝐖ᥱᥣᥴ᥆mᥱ ❯*
*˙·.˙˙·╰──────〰─◠─〰─◠─*
*│ _𝐔sᥙᥲrі᥆_ ⑄▷@${m.messageStubParameters[0].split`@`[0]}*
*│ _𝐌іᥱmᑲr᥆s_ : ${groupSize} Miembros*
*│ _𝐏ᥲís_ : ${pais}*
*│ _𝐅ᥱᥴһᥲ_ : ${fecha}*
*│ _𝐇᥆rᥲ_ : ${hora}*
*│ _𝐆rᥙ⍴᥆_ : ${groupMetadata.subject}*
*╰̇━̷̣─̵̇━̷̣─̵̇━̷̣─̶̇≪≪❁≫≫̇─̵̣━̷̇─̵̣━̷̇─̵̣━̷̇╯*        
*_${global.welcom1}_*
> ✐ \`\`\`Usa #𝗺𝗲𝗻𝘂 para ver los comandos disponibles.\`\`\`
¡🌴 Disfruta tu estadía en el grupo!`;

    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak);
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `      *╭┈̶̣̣̣̣̄┈̵̣̣̣┈̶̣̣̄┈̵┈̶̣̣̣̣̄┈̵┈̶̣̣̣̣̣̄┈̵┈̶̣̣̣̄┈̵┈̵̣̣̄┈̶┈̵̣̣̣̄┈̶┈̵̣̣̣̣̄┄̶┈̵̣̣̣̣̄┄̶╮*
*˙·.˙··┊ #+#+↷❮ 𝐀𝐃𝐈Ó𝐒 ❯*
*˙·.˙˙·╰──────〰─◠─〰─◠─*
*│ _𝐔sᥙᥲrі᥆_ ⑄▷@${m.messageStubParameters[0].split`@`[0]}*
*│ _𝐌іᥱmᑲr᥆s_ : ${groupSize} Miembros*
*│ _𝐏ᥲís_ : ${pais}*
*│ _𝐅ᥱᥴһᥲ_ : ${fecha}*
*│ _𝐇᥆rᥲ_ : ${hora}*
*│ _𝐆rᥙ⍴᥆_ : ${groupMetadata.subject}*
*╰̇━̷̣─̵̇━̷̣─̵̇━̷̣─̶̇≪≪❁≫≫̇─̵̣━̷̇─̵̣━̷̇─̵̣━̷̇╯*        
*_${global.welcom2}_*
> ✐ \`\`\`Usa #menu para ver los comandos disponibles.\`\`\`
🥯 ¡Te Esperamos Pronto!`;

    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak);
  }
}