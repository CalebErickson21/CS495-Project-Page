/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				accent: "#9E1B32",
				neutral: "#828A8F",
			  
				light: {
					background: "#FFFFFF",
					surface: "#F5F6F7",
					text: {
						primary: "#1F2933",
						secondary: "#4B5563",
					},
					accentSurface: "#F9E6EA",
					accentText: "#7A1426",
				},
			  
				dark: {
					background: "#111315",
					surface: "#1C1F23",
					text: {
						primary: "#F3F4F6",
						secondary: "#C7CBD1",
					},
					accentSurface: "#2A1418",
					accentText: "#F2B6C0",
				},
			},
			  
			  

			screens: {
				// Minimum width breakpoints
				'sm': {'min': '576px'},
				'md': {'min': '768px'},
				'lg': {'min': '992px'},
				'xl': {'min': '1200px'},
			},

			keyframes: {
			},

			animation: {
			}
		},
	},
	plugins: [],
};

