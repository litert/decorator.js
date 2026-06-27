import { defineConfig } from 'vitepress';

export default defineConfig({
    title: '@litert/decorator',
    description: 'A TypeScript decorator utility library for modern, legacy, and compatible decorators.',
    base: '/projects/decorator.js/',
    sitemap: {
        hostname: 'https://litert.org/projects/decorator.js/',
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'API Docs', link: '/en/api/' },
        ],
        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Overview', link: '/en/' },
                    { text: 'Quick Start', link: '/en/quick-start' },
                    { text: 'FAQ', link: '/en/faq' },
                ],
            },
            {
                text: 'Tutorials',
                items: [
                    { text: 'Overview', link: '/en/tutorials/' },
                    { text: 'Modern Decorators', link: '/en/tutorials/modern-decorators' },
                    { text: 'Legacy Decorators', link: '/en/tutorials/legacy-decorators' },
                    { text: 'Compatible Decorators', link: '/en/tutorials/compatible-decorators' },
                    { text: 'Unified Decorator API', link: '/en/tutorials/unified-api' },
                    { text: 'General Decorators', link: '/en/tutorials/general-decorators' },
                    { text: 'Composition', link: '/en/tutorials/composition' },
                    { text: 'Metadata', link: '/en/tutorials/metadata' },
                ],
            },
            {
                text: 'API Reference',
                items: [
                    { text: 'API Overview', link: '/en/api/' },
                    { text: 'Modern', link: '/en/api/modern/' },
                    { text: 'Legacy', link: '/en/api/legacy/' },
                    { text: 'Compatible', link: '/en/api/compatible/' },
                ],
            },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/litert/decorator.js' },
        ],
    },
});
