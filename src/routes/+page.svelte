<script lang="ts">
	import ProductCard from '../lib/productCard.svelte';
	import { get } from 'svelte/store';
	import { cartItems } from '../cart';
	import { _getProducts, _getPriceData } from './api/stripeCheckout/+server';

	const _products = _getProducts();
	console.log(_products);
	let prod: Product[] = [];
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

<div class="container h-full mx-auto flex justify-center items-center">
	<body class="bg-transparent overflow-auto">
		<div class=" grid grid-cols-3 gap-4">
			<div class="col-span-3">
				<h1>Messicani</h1>
				<h3>"A veces lo más simple es lo más elegante"</h3>
			</div>

			{#each prod as product}
				<ProductCard {product} />
			{:else}
				<!--Loading animation-->
				<div class="col-span-3">
					<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
				</div>
			{/each}

			<!--Position checkout button to the right-->
			<div class="col-span-3">
				<button class="btn variant-filled-primary" on:click={() => checkout()}
					>Checkout with Stripe API</button
				>
			</div>
		</div></body
	>
</div>

<style>
	/* Make page scrollable */
	.container {
		/* center the content */
		display: flex;
		justify-content: center;
		align-items: center;
		/* make the page full height */
		height: 100vh;
	}

	/* Make checkout button fixed to the bottom */
	.btn {
		position: fixed;
		bottom: 0;
		right: 0;
		margin: 3rem;
	}
</style>
