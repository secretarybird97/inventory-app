import Stripe from "stripe";
const SECRET_STRIPE_KEY = "sk_test_51N0b58IrPOgJLuRz4Wb2yfTesDUwl0XkEVytc3XdpM8HbgXFzxeym69Ctvbaz8FScWs1UuIeyssdr8ytWnCXfpGL0025XlmYXF";
const _stripe = new Stripe(SECRET_STRIPE_KEY, {
  apiVersion: "2022-11-15"
});
const POST = async ({ request }) => {
  const data = await request.json();
  const items = data.items;
  console.log(items);
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({ price: item.id, quantity: item.quantity });
  });
  const session = await _stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "inventory-qtqonbldr-secretarybird97.vercel.app/success",
    cancel_url: "inventory-qtqonbldr-secretarybird97.vercel.app/cancel"
  });
  return new Response(
    JSON.stringify({ url: session.url }),
    // frontend will get this url to redirect
    {
      status: 200,
      headers: { "content-type": "application/json" }
    }
  );
};
async function _getProducts() {
  const products = await _stripe.products.list();
  return products;
}
async function _getPriceData(productId) {
  const price = await _stripe.prices.retrieve(productId);
  return price;
}
export {
  POST,
  _getPriceData,
  _getProducts
};
