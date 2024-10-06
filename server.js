const express = require('express');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar los datos entrantes como JSON
app.use(express.urlencoded({ extended: false }));

// Endpoint para recibir mensajes de WhatsApp
app.post('/whatsapp', (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();

  // Si el usuario envía la palabra clave "imagen", se responde con una imagen
  if (req.body.Body.toLowerCase() === 'imagen') {
    const message = twiml.message();
    message.body('Aquí está tu imagen:');
    message.media('https://i.pinimg.com/236x/fc/6c/c7/fc6cc728c419dc21c05a36a9d06a93be.jpg'); // Cambia la URL a la de tu imagen
  } else {
    twiml.message('Escribe "imagen" para recibir una imagen.');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
