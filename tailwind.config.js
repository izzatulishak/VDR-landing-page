/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                bg: 'var(--color-bg)',
                surface: 'var(--color-surface)',
                'surface-glass': 'var(--color-surface-glass)',
                border: 'var(--color-border)',
                'text-primary': 'var(--color-text-primary)',
                'text-secondary': 'var(--color-text-secondary)',
                accent: {
                    DEFAULT: '#3A6FF8', // Blue-500 (Reverted)
                    hover: '#2563eb',   // Blue-600
                },
                header: {
                    bg: 'var(--header-bg)',
                    text: 'var(--header-text)',
                    border: 'var(--header-border)',
                    icon: 'var(--header-icon)',
                    shadow: 'var(--header-shadow)',
                },
                search: {
                    bg: 'var(--search-bg)',
                    border: 'var(--search-border)',
                }
            },
            animation: {
                'slide-in-right': 'slideInRight 0.3s ease-out forwards',
                'fade-in': 'fadeIn 0.2s ease-out forwards',
            },
            keyframes: {
                slideInRight: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
