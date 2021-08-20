const owner = {
	firstName: "Venki",
	lastName: "Vijay",
	role: ["Full Stack Developer"],
	experience: 4,
}

const projects = [
	{
		name: "Xplore",
		description: "Searchable/filterable file browser for a GitHub repo",
		tags: ["Vue2", "Nuxt.js", "PWA"],
		imageURL: "",
	},
	{
		name: "Invoice Tracker",
		description: "A simple app to create and manage invoices",
		tags: ["Vue2", "Firebase", "Chart.js"],
		imageURL: "",
	},
]

const socials = [
	{
		primaryIcon: "github",
		url: "https://github.com/venkivijay",
	},
	{
		primaryIcon: "linkedin",
		url: "https://www.linkedin.com/in/venkivijay/",
	},
	{
		primaryIcon: "twitter",
		url: "https://twitter.com/venkivijay_",
	},
	// TODO: Add whatsapp url
	{
		primaryIcon: "whatsapp",
		url: "",
	},
	// TODO: Add rss url
	{
		primaryIcon: "rss",
		url: "",
	},
]

const contact = {
	location: "Salem - Chennai, TamilNadu, India",
	email: "me@venkivijay.com",
	phone: "+91-6369888030",
}

export { owner, projects, socials, contact }
