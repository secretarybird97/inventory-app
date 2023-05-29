import { c as create_ssr_component, g as get_store_value, e as escape, d as add_attribute, f as each, v as validate_component } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
import { _getProducts, _getPriceData } from "../endpoints/api/stripeCheckout/_server.ts.js";
const cartItems = writable([]);
const ProductCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { product = { id: "", name: "", price: 0, img: "" } } = $$props;
  let cart = get_store_value(cartItems);
  let cartItemIndex = cart.findIndex((item) => {
    return item.id === product.id;
  });
  let cartProduct = cart[cartItemIndex];
  cartItems.subscribe((newCartValue) => {
    cart = newCartValue;
    cartItemIndex = cart.findIndex((item) => {
      return item.id === product.id;
    });
    cartProduct = cart[cartItemIndex];
    console.log(cart);
  });
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  return `<div class="card"><header class="card-header"><h2>${escape(product.name)}</h2></header>
	${cartProduct !== void 0 ? `<div class="card-body px-4">Cantidad: <strong>${escape(cartProduct.quantity)}</strong></div>` : ``}
	<div class="card-body px-4">Precio: $${escape(product.price)} MXN
	</div>
	<footer class="card-footer"><button class="p-2 rounded variant-glass-primary">Agragar</button>
		<button class="p-2 rounded variant-glass-error">Remover</button>

		
		<div class="h-full justify-center items-center p-2 flex">${product.img !== void 0 ? `<img${add_attribute("src", product.img, 0)} alt="">` : `<img src="https://picsum.photos/200/300" alt="">`}</div></footer></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".container.svelte-1uqwlms{display:flex;justify-content:center;align-items:center;height:100vh}.btn.svelte-1uqwlms{position:fixed;bottom:0;right:0;margin:3rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const _products = _getProducts();
  console.log(_products);
  let prod = [];
  _products.then((response) => {
    response.data.forEach(async (item) => {
      if (item.active === true) {
        let price = await _getPriceData(item.default_price?.toString());
        prod.push({
          id: item.default_price?.toString(),
          name: item.name,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          price: price.unit_amount / 100,
          img: item.images[0]
        });
      }
      prod = prod;
    });
  });
  $$result.css.add(css);
  return `<div class="container h-full mx-auto flex justify-center items-center svelte-1uqwlms"><body class="bg-transparent overflow-auto"><div class="grid grid-cols-3 gap-4"><div class="col-span-3"><h1>Messicani</h1>
				<h3>&quot;A veces lo más simple es lo más elegante&quot;</h3></div>

			${prod.length ? each(prod, (product) => {
    return `${validate_component(ProductCard, "ProductCard").$$render($$result, { product }, {}, {})}`;
  }) : `
				<div class="col-span-3"><div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
				</div>`}

			
			<div class="col-span-3"><button class="btn variant-filled-primary svelte-1uqwlms">Checkout with Stripe API</button></div></div></body>
</div>`;
});
export {
  Page as default
};
