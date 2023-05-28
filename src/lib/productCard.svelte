<script lang="ts">
	import { get } from 'svelte/store';
	import { cartItems, addToCart, removeFromCart } from '../cart';

	export let product: Product = {
		id: '',
		name: '',
		price: 0,
		img: ''
	};

	let cart = get(cartItems); // [ { id: "1", quantity: 6 }, { id: "2", quantity: 3 } ]
	// id: "1"
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
</script>

<div class="card">
	<header class="card-header"><h2>{product.name}</h2></header>
	{#if cartProduct !== undefined}
		<div class="card-body px-4">
			Cantidad: <strong>{cartProduct.quantity}</strong>
		</div>
	{/if}
	<div class="card-body px-4">
		Precio: ${product.price} MXN
	</div>
	<footer class="card-footer">
		<button class="p-2 rounded variant-glass-primary" on:click={() => addToCart(product.id)}
			>Agragar</button
		>
		<button class="p-2 rounded variant-glass-error" on:click={() => removeFromCart(product.id)}
			>Remover</button
		>

		<!-- Add image to card-->
		<div class="h-full justify-center items-center p-2 flex">
			{#if product.img !== undefined}
				<img src={product.img} alt="" />
			{:else}
				<img src="https://picsum.photos/200/300" alt="" />
			{/if}
		</div>
	</footer>
</div>
