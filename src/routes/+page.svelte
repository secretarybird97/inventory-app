<script lang="ts">
	import ProductCard from '../lib/productCard.svelte';
	import { get } from 'svelte/store';
	import { cartItems } from '../cart';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { _getProducts } from './api/stripeCheckout/+server';

	const products: Product[] = [
		{
			id: 'price_1N0pfqIrPOgJLuRzXgayPAM0',
			name: 'Coffee',
			price: 84
		},
		{
			id: 'price_1N0ph5IrPOgJLuRzzpVzAaUG',
			name: 'Sunglasses',
			price: 450
		},
		{
			id: 'price_1N0phrIrPOgJLuRzSiHeFF9d',
			name: 'Water Bottle',
			price: 14
		}
	];

	const _products = _getProducts();

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
		{#each products as product}
			<ProductCard {product} />
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={() => checkout()}
				>Checkout with Stripe API</button
			>
		</div>
	</div>
</div>
