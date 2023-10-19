const mercadopago = require("mercadopago");
const {
  sendSuccessEmail,
  sendFailureEmail,
} = require("../envioMail/envioMail");

mercadopago.configure({
  access_token:
    "TEST-2664276290314152-091023-a8dbce86749b18cb2960e492a1d25bea-1476921582",
});

async function placeOrder(items) {
  let preference = {
    items: items.map((item) => ({
      id: item.id,
      title: item.description,
      unit_price: parseInt(item.price),
      quantity: item.quantity,
      currency_id: "ARS",
    })),
    back_urls: {
      success: "https://apibackend-vpxw.onrender.com/mp/success",
      failure: "https://apibackend-vpxw.onrender.com/mp/failure",
      pending: "https://apibackend-vpxw.onrender.com/mp/pending",
    },
  };
  console.log("Preference", preference);
  const response = await mercadopago.preferences.create(preference);
  console.log("Estado de la respuesta de MercadoPago:", response.status);

  if (response.status === 201) {
    // Si la compra es exitosa, envía un correo electrónico
    await sendSuccessEmail();
  } else if (response.status === 400) {
    // Si la compra es rechazada, envía un correo electrónico de fallo
    await sendFailureEmail();
  }

  return response;
}

module.exports = placeOrder;