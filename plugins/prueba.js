import fs from 'fs';

function eliminarArchivo(rutaArchivo) {
  if (fs.existsSync(rutaArchivo)) fs.unlinkSync(rutaArchivo);
}

const handler = async (bot, chatId, nombreUsuario, fecha, hora, info, responder, prefijo, nombreBot) => {
  try {
    const imagenMenu = "https://xatimg.com/image/TyANiC68n4eZ.jpg";

    await bot.sendMessage(chatId, {
      image: { url: imagenMenu },
      caption: `
╭─❍【🌸 *${nombreBot}* 🌸】❍─╮
│👤 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: *${nombreUsuario}*
│📅 𝗙𝗲𝗰𝗵𝗮: *${fecha}*
│⏰ 𝗛𝗼𝗿𝗮: *${hora}*
╰────────────────────╯
      `.trim(),
      footer: `🔷 ${nombreBot} | Tu asistente con encanto e inteligencia 💙`,
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: '🌐 Ver comandos' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: "🌐 Lista de comandos",
              sections: [
                {
                  title: "🌟 Comandos principales",
                  highlight_label: "By Fenrys V4",
                  rows: [
                    { title: "📜 Menú principal", description: "Comandos básicos y más usados.", id: `${prefijo}menupp` },
                    { title: "🆕 Nuevos comandos", description: "Lo más reciente en el bot.", id: `${prefijo}menunovo` },
                    { title: "👑 Menú del dueño", description: "Acceso exclusivo para el creador.", id: `${prefijo}menudono` },
                    { title: "🛡 Administración", description: "Herramientas para grupos.", id: `${prefijo}menuadm` },
                    { title: "💠 Premium", description: "Funciones VIP para usuarios premium.", id: `${prefijo}menupremium` },
                    { title: "🎉 Juegos y diversión", description: "Comandos para divertirse en grupo.", id: `${prefijo}brincadeiras` },
                    { title: "🖼 Efectos visuales", description: "Aplica efectos con estilo.", id: `${prefijo}Efeitosimg` },
                    { title: "🪙 Sistema de monedas", description: "Gana y usa monedas virtuales.", id: `${prefijo}menucoins` },
                    { title: "⚔️ Mundo RPG", description: "Aventuras, batallas y evolución.", id: `${prefijo}menurpg` },
                    { title: "🎨 Crear logos", description: "Genera logos personalizados.", id: `${prefijo}menulogos` }
                  ]
                },
                {
                  title: "💖 Apoya el proyecto",
                  highlight_label: "Donaciones & Soporte",
                  rows: [
                    { title: "🌟 Donar por Pix", description: "Apoya el proyecto con tu aporte!", id: `${prefijo}doar` }
                  ]
                },
                {
                  title: "📢 Comunidad Fenrys",
                  highlight_label: "¡Entérate de todo!",
                  rows: [
                    { title: "💬 Grupo oficial", description: "Únete a nuestro grupo oficial.", id: `${prefijo}grupobot` },
                    { title: "🤝 Alianzas", description: "Sé parte del equipo!", id: `${prefijo}parcerias` }
                  ]
                }
              ]
            })
          }
        }
      ],
      headerType: 1,
      viewOnce: true
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