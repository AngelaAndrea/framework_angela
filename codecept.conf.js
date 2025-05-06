exports.config = {
  tests: './features/**/*.feature',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://www.youtube.com',
      show: true,
      browser: 'chromium',
    }
  },
  gherkin: {
    features: './features/youtube.feature',
    steps: ['./steps/step_definitions/youtube.js']
  },
  plugins: {
    // Elimina esta sección relacionada con Allure
  },
  name: 'framework_angela',
}

