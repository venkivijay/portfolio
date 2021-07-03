module.exports = {
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			primary: "var(--color-primary)",
			secondary: "var(--color-secondary)",
			background: "var(--color-background)",
			surface: "var(--color-surface)",
			error: "var(--color-error)",
			accent: "var(--color-accent)",
			tag: "var(--color-tag)",
			"accent-alpha": "var(--color-accent-alpha)",
		},
		fontFamily: {
			default: "Quicksand, sans-serif",
			brand: "Megrim, cursive",
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
