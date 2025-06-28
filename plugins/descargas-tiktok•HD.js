import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, '*Ingresa el link del video de TikTok* 😄', m);
  }

  try {
    await m.react('⏳');
    const result = await tiktokdl(text);

    if (!result.status) throw new Error(result.message || 'No se pudo obtener el video.');

    // Enviar calidad HD si está disponible
    if (result.hd) {
      await conn.sendMessage(m.chat, {
        video: { url: result.hd },
        caption: '*[ TIKTOK HD ]* ✅'
      }, { quoted: m });
    } else if (result.normal) {
      // Si no hay HD, enviar calidad normal
      await conn.sendMessage(m.chat, {
        video: { url: result.normal },
        caption: '*[ TIKTOK CALIDAD NORMAL ]*'
      }, { quoted: m });
    } else {
      throw new Error('No se encontró ningún video válido.');
    }

    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.react('❌');
    conn.reply(m.chat, '*Ocurrió un error al procesar el video 😢*', m);
  }
};

handler.help = ['tiktokhd <url>'];
handler.tags = ['descargas'];
handler.command = ['tiktokhd'];

export default handler;

// ────────────────────────────────────────

async function tiktokdl(url) {
  try {
    const { data } = await axios.post("https://savetik.co/api/ajaxSearch", new URLSearchParams({
      q: url,
      lang: 'en'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const $ = cheerio.load(data.data);

    const normal = $('div.video-data .tik-right p:nth-child(1) a').attr('href');
    const hd = $('div.video-data .tik-right p:nth-child(3) a').attr('href');

    return {
      status: true,
      normal,
      hd: hd || null
    };
  } catch (err) {
    return {
      status: false,
      message: 'Error al obtener datos desde el servidor.'
    };
  }
}