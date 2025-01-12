/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended', // Recommandations de base d'ESLint
    'plugin:vue/vue3-recommended', // Règles spécifiques à Vue 3
    'plugin:prettier/recommended', // Active le plugin Prettier et affiche les erreurs comme des erreurs ESLint
    '@vue/eslint-config-prettier', // Désactive les règles qui peuvent entrer en conflit avec Prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest', // Support des dernières versions ECMAScript
    sourceType: 'module',
  },
  rules: {
    // Règles ESLint personnalisées
    'no-unused-vars': 'warn', // Avertissement pour les variables inutilisées
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // Limite les `console.log` en production
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // Règles spécifiques à Vue
    'vue/multi-word-component-names': 'off', // Autorise les noms de composant avec un seul mot
    'vue/require-default-prop': 'off', // Désactive l'obligation d'avoir des props par défaut

    // Règles Prettier
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // Utilise les simples quotes
        semi: true, // Terminer les lignes par un point-virgule
        tabWidth: 2, // Taille des tabulations
        trailingComma: 'es5', // Virgule finale pour les objets, tableaux, etc.
        bracketSpacing: true, // Espaces entre les accolades
        arrowParens: 'always', // Parenthèses autour des arguments des fonctions fléchées
        endOfLine: 'lf', // Assure les fins de ligne en LF
      },
    ],
  },
};
