import yts from "yt-search";
import fetch from "node-fetch";

const LIMIT_MB = 100;
const API_KEY = "Sylphiette's"; 

const countryCodes = {
  '+54': { country: 'Argentina', timeZone: 'America/Argentina/Buenos_Aires'},
  '+591': { country: 'Bolivia', timeZone: 'America/La_Paz'},
  '+56': { country: 'Chile', timeZone: 'America/Santiago'},
  '+57': { country: 'Colombia', timeZone: 'America/Bogota'},
  '+506': { country: 'Costa Rica', timeZone: 'America/Costa_Rica'},
  '+53': { country: 'Cuba', timeZone: 'America/Havana'},
  '+593': { country: 'Ecuador', timeZone: 'America/Guayaquil'},
  '+503': { country: 'El Salvador', timeZone: 'America/El_Salvador'},
  '+34': { country: 'España', timeZone: 'Europe/Madrid'},
  '+502': { country: 'Guatemala', timeZone: 'America/Guatemala'},
  '+504': { country: 'Honduras', timeZone: 'America/Tegucigalpa'},
  '+52': { country: 'México', timeZone: 'America/Mexico_City'},
  '+505': { country: 'Nicaragua', timeZone: 'America/Managua'},
  '+507': { country: 'Panamá', timeZone: 'America/Panama'},
  '+595': { country: 'Paraguay', timeZone: 'America/Asuncion'},
  '+51': { country: 'Perú', timeZone: 'America/Lima'},
  '+1': { country: 'Puerto Rico', timeZone: 'America/Puerto_Rico'},
  '+1-809': { country: 'República Dominicana', timeZone: 'America/Santo_Domingo'},
  '+1-829': { country: 'República Dominicana', timeZone: 'America/Santo_Domingo'},
  '+1-849': { country: 'República Dominicana', timeZone: 'America/Santo_Domingo'},
  '+598': { country: 'Uruguay', timeZone: 'America/Montevideo'},
  '+58': { country: 'Venezuela', timeZone: 'America/Caracas'}
};

const getGreeting = (hour) => {
  return hour < 12 ? 'Buenos días 🌅' : hour < 18 ? 'Buenas tardes 🌄' : 'Buenas noches 🌃';
};

const getUserGreeting = (userNumber) => {
  const phoneCodeMatch = userNumber.match(/\+(\d+)/);
  const phoneCode = phoneCodeMatch ? `+${phoneCodeMatch[1].split('-')[0]}` : null;
  const countryInfo = phoneCode ? countryCodes[phoneCode] : null;
  const now = new Date();

  if (countryInfo) {
    try {

      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: countryInfo.timeZone,
        hour: 'numeric',
        hour12: false
      });
      const hour = parseInt(formatter.format(now));
      return `${getGreeting(hour)} @${userNumber.split('@')[0]}, (${countryInfo.country})`;
    } catch (e) {
      console.error(`Error getting local time for ${userNumber}: ${e.message}`);

      return `${getGreeting(now.getHours())} @${userNumber.split('@')[0]}, (${countryInfo.country})`;
    }
  }
  return `${getGreeting(now.getHours())} @${userNumber.split('@')[0]}`;
};

const fetchVideoInfo = async (query) => {
  try {
    const res = await yts(query);
    return res?.all?.[0] || null;
  } catch (error) {
    console.error("Error fetching video info from yt-search:", error);
    return null;
  }
};

const getDownloadLinks = (url) => ({
  audio: `https://api.sylphy.xyz/download/ytmp3?url=${encodeURIComponent(url)}&apikey=${API_KEY}`,
  video: `https://api.sylphy.xyz/download/ytmp4?url=${encodeURIComponent(url)}&apikey=${API_KEY}`,
});

const handler = async (m, { conn, text, command}) => {
  if (!text) {
    return m.reply("✨ Ingresa el nombre de un video o una URL de YouTube.");
  }
  await m.react("🔎");

  const userNumber = m.sender.split('@')[0];
  const saludo = getUserGreeting(m.sender); // Pass the full m.sender to getUserGreeting
  const intro = `${saludo}, ¿cómo estás? 🎧 Tu pedido será procesado...`;


  await conn.sendMessage(m.chat, { text: intro, mentions: [m.sender] }, { quoted: m });

  const video = await fetchVideoInfo(text);
  if (!video) {
    return m.reply("🚫 No encontré ningún resultado.");
  }

  const caption = `
╭─⬣「⚡  *𝒓𝒊𝒏 𝒊𝒕𝒐𝒔𝒉𝒊 ☃️*  ⭐」⬣
│ ≡🌴 *Título:* ${video.title}
│ ≡🥥 *Autor:* ${video.author.name}
│ ≡📅 *Publicado:* ${video.ago}
│ ≡🐉 *Vistas:* ${video.views}
│ ≡🌲 *Duración:* ${video.duration.timestamp}
│ ≡🦠 *Link:* ${video.url}
╰──⬣
*🐾 ʀɪɴ ɪᴛᴏsʜɪ ʙᴏᴛ ᴍᴅ あ*
`;

  try {

    const thumbnailBuffer = await (await fetch(video.thumbnail)).buffer();
    await conn.sendFile(m.chat, thumbnailBuffer, "thumb.jpg", caption, m);
  } catch (e) {
    console.error("Error sending thumbnail:", e);

    await m.reply(caption);
  }

  const { audio, video: videoLink} = getDownloadLinks(video.url);

  try {
    if (command === "play") {
      const audioRes = await fetch(audio);
      if (!audioRes.ok) { // Check if the response was successful (status 200-299)
        throw new Error(`Failed to fetch audio: ${audioRes.statusText}`);
      }
      const audioData = await audioRes.json();
      if (!audioData.status || !audioData.res?.downloadURL) {
        return m.reply("😢 No pude obtener el audio o el enlace de descarga.");
      }
      await conn.sendFile(m.chat, audioData.res.downloadURL, `${audioData.res.title}.mp3`, "", m);
    } else if (["play2", "playvid"].includes(command)) {
      const videoRes = await fetch(videoLink);
      if (!videoRes.ok) { 
        throw new Error(`Failed to fetch video: ${videoRes.statusText}`);
      }
      const videoData = await videoRes.json();
      if (!videoData.status || !videoData.res?.url) {
        return m.reply("😢 No pude obtener el video o el enlace de descarga.");
      }
      const head = await fetch(videoData.res.url, { method: "HEAD" });
      const contentLength = head.headers.get("content-length");
      const sizeMB = contentLength ? parseInt(contentLength, 10) / (1024 * 1024) : 0;
      const asDoc = sizeMB >= LIMIT_MB;

      await conn.sendFile(m.chat, videoData.res.url, `${videoData.res.title}.mp4`, "", m, null, {
        asDocument: asDoc,
        mimetype: "video/mp4",
      });
    }
    await m.react("✅");
  } catch (err) {
    console.error("Error during download process:", err);
    m.reply("💥 Ocurrió un error al procesar tu solicitud: " + err.message);
  }
};

handler.help = ["play", "play2", "playvid"];
handler.tags = ["download"];
handler.command = ["play", "play2", "playvid"];

export default handler;