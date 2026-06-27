// eslint.config.js
import * as LitertEslintRules from '@litert/eslint-plugin-rules';

export default [
    {
        plugins: {
            '@litert/rules': LitertEslintRules,
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            }
        },
    },
    ...LitertEslintRules.configs.typescript,
    {
        files: [
            'packages/library/src/**/*.ts',
        ]
    }
];
