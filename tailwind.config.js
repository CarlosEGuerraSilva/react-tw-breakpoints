/** @type {import('tailwindcss').Config} */
const gapValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];
const colValues = Array.from({ length: 12 }, (_, i) => i + 1);
const bps = ["sm", "md", "lg", "xl", "2xl"];

module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: { extend: {} },
	safelist: [
		// base col-spans and responsive variants
		...colValues.map(n => `col-span-${n}`),
		...bps.flatMap(bp => colValues.map(n => `${bp}:col-span-${n}`)),

		// base gaps and responsive variants
		...gapValues.map(n => `gap-${n}`),
		...bps.flatMap(bp => gapValues.map(n => `${bp}:gap-${n}`)),
	],
	plugins: [],
};