exports.config = {
  tests: './features/**/*.feature',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://www.youtube.com',
      show: true,
      browser: 'chromium'
    }
  },
  gherkin: {
    features: './features/youtube.feature',
    steps: [ './steps/step_definitions/youtube.js']
  },
  plugins: {
    allure: {
      enabled: true,        // Asegúrate de que el plugin esté habilitado
      outputDir: './output/allure-report',  // Verifica que la ruta esté configurada correctamente
    }
  },
  name: 'framework_angela'
}
