module.exports = {
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: false,
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
			base: "Quicksand, sans-serif",
			brand: "Megrim, cursive",
		},
		fontSize: {
			small: ["0.7rem", "1"],
			base: ["clamp(16px,calc(1rem + .25vw),26px)", "1.7"],
			h1: ["clamp(2.5rem,calc(1rem + 3.5vw),5rem)", "1.1"],
			h2: ["clamp(1.2rem,calc(1rem + 0.5vw),2rem)", "1.1"],
			h3: ["1.5rem", "1.1"],
			h4: ["1.2rem", "1.05"],
			h5: ["1rem", "1"],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
