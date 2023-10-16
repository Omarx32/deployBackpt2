const mercadopago = require("mercadopago");

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
      success: "http://localhost:3001/mp/success",
      failure: "http://localhost:3001/mp/failure",
      pending: "http://localhost:3001/mp/pending",
    },
    // auto_return: "approved",
  };
  console.log(preference);
  const response = await mercadopago.preferences.create(preference);

  return response;
}

module.exports = placeOrder;
