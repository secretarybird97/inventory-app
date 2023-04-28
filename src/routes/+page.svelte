<script lang="ts">
	import ProductCard from '../lib/productCard.svelte';
	import { get } from 'svelte/store';
	import { cartItems } from '../cart';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { _getProducts, _getPriceData } from './api/stripeCheckout/+server';
	import { compute_rest_props } from 'svelte/internal';

	const _products = _getProducts();
	// console.log(_products);

	let prod: Product[] = [];
	_products.then((response) => {
		response.data.forEach(async (item) => {
			let price = await _getPriceData(item.default_price?.toString());
			prod.push({
				id: item.default_price?.toString(),
				name: item.name,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				price: price.unit_amount / 100
			});
			prod = prod;
		});
	});

	// console.log(prod);

	async function checkout() {
		await fetch('api/stripeCheckout', {
			// http://localhost:5173/api/stripeCheckout
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ items: get(cartItems) })
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				window.location.replace(data.url);
			});
	}
</script>

<header><LightSwitch /></header>
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>Messicani</h1>
			<h3 class="italic">"A veces lo mas simple es lo mas elegante"</h3>
		</div>
		{#each prod as product}
			<ProductCard {product} />
		{:else}
			<!--Loading animation-->
			<div class="col-span-3">
				<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
			</div>
		{/each}

		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={() => checkout()}
				>Checkout with Stripe API</button
			>
		</div>
	</div>
</div>
