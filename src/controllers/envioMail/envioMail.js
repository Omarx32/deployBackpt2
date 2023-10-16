const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: "wanderluxe01@gmail.com",
        pass: "zdsk oyjx wnlt fjhr",
    }
});

async function envioMail() {
    // Enviar un correo electrónico utilizando el objeto de transporte definido anteriormente
    const info = await transporter.sendMail({
      from: '"Wander Luxe👻" <wanderluxe01@gmail.com>', // Dirección del remitente
      to: "wanderluxe01@gmail.com", // Lista de destinatarios
      subject: "¡Hola ✔",                   // Asunto del correo
      text: "¿Hola mundo?",                // Cuerpo del correo en texto plano
    });
  
    console.log("Mensaje enviado: %s", info.messageId);
    // Mensaje enviado: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTA: Puedes visitar https://forwardemail.net/my-account/emails para ver el estado de entrega de tu correo y previsualizarlo
    //       O puedes usar el paquete "preview-email" de npm para previsualizar correos electrónicos localmente en navegadores y el simulador de iOS
    //       <https://github.com/forwardemail/preview-email>
    //
  }
  
  // Llamar a la función main y manejar errores si los hay
  envioMail().catch(console.error);

