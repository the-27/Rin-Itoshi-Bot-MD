import fs from 'fs';
import moment from 'moment-timezone';

function eliminarArchivo(rutaArchivo) {
  if (fs.existsSync(rutaArchivo)) fs.unlinkSync(rutaArchivo);
}

const handler = async (bot, chatId, name, info, responder, prefijo, nombreBot) => {
  try {
    const imagenMenu = "https://xatimg.com/image/TyANiC68n4eZ.jpg";
    const fecha = moment().tz('America/Lima').format('DD/MM/YYYY');
    const hora = moment().tz('America/Lima').format('HH:mm:ss');

    // Enviar imagen primero (opcional)
    await bot.sendMessage(chatId, {
      image: { url: imagenMenu },
      caption: `
╭─❍【🌸 *${nombreBot}* 🌸】❍─╮
│👤 Usuario: *${name}*
│📅 Fecha: *${fecha}*
│⏰ Hora: *${hora}*
╰────────────────────╯
`.trim(),
    }, { quoted: info });

    // Enviar menú con listas
    await bot.sendMessage(chatId, {
      title: "🌐 Lista de comandos",
      text: `🔷 ${nombreBot} | Tu asistente con encanto e inteligencia 💙`,
      buttonText: "🌐 Ver comandos",
      sections: [
        {
          title: "🌟 Comandos principales",
          rows: [
            { title: "📜 Menú principal", description: "Comandos básicos y más usados.", rowId: `${prefijo}menupp` },
            { title: "🆕 Nuevos comandos", description: "Lo más reciente en el bot.", rowId: `${prefijo}menunovo` },
            { title: "👑 Menú del dueño", description: "Acceso exclusivo para el creador.", rowId: `${prefijo}menudono` },
            { title: "🛡 Administración", description: "Herramientas para grupos.", rowId: `${prefijo}menuadm` },
            { title: "💠 Premium", description: "Funciones VIP para usuarios premium.", rowId: `${prefijo}menupremium` },
            { title: "🎉 Juegos y diversión", description: "Comandos para divertirse en grupo.", rowId: `${prefijo}brincadeiras` },
            { title: "🖼 Efectos visuales", description: "Aplica efectos con estilo.", rowId: `${prefijo}Efeitosimg` },
            { title: "🪙 Sistema de monedas", description: "Gana y usa monedas virtuales.", rowId: `${prefijo}menucoins` },
            { title: "⚔️ Mundo RPG", description: "Aventuras, batallas y evolución.", rowId: `${prefijo}menurpg` },
            { title: "🎨 Crear logos", description: "Genera logos personalizados.", rowId: `${prefijo}menulogos` },
          ]
        },
        {
          title: "💖 Apoya el proyecto",
          rows: [
            { title: "🌟 Donar por Pix", description: "Apoya el proyecto con tu aporte!", rowId: `${prefijo}doar` }
          ]
        },
        {
          title: "📢 Comunidad Fenrys",
          rows: [
            { title: "💬 Grupo oficial", description: "Únete a nuestro grupo oficial.", rowId: `${prefijo}grupobot` },
            { title: "🤝 Alianzas", description: "Sé parte del equipo!", rowId: `${prefijo}parcerias` }
          ]
        }
      ]
    }, { quoted: info });

  } catch (error) {
    console.error("❌ Error al mostrar el menú:", error);
    responder("❌ Ocurrió un error al mostrar el menú. Intenta más tarde.");
  }
};

handler.help = ['menulist'];
handler.tags = ['principal'];
handler.command = ['menulist', 'ayuda'];

export default handler;