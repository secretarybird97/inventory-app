// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare class Product {
	id: string | null | undefined;
	name: string;
	price: number | null | undefined;
	img: string | null | undefined;
}

declare class CartItem {
	id: string;
	quantity: number;
}
