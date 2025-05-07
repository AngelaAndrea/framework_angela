exports.config = {
  tests: './features/**/*.feature',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://www.youtube.com',
      show: false,         // Apaga el modo gráfico
      headless: true,      // Asegura que sea en modo headless
      timeout: 30000, // Aumenta timeout global
      waitForTimeout: 30000,
      // ...
      browser: 'chromium'
    }
  },
  gherkin: {
    features: './features/youtube.feature',
    steps: ['./steps/step_definitions/youtube.js']
  },
  plugins: {
    allure: {
      enabled: true,
      require: "allure-codeceptjs",
      resultsDir: "allure-results",
    },
  },
  name: 'framework_angela',
}

