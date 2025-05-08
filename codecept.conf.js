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
      locale: 'es-MX',
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
    outputDir: './output/allure-results', // Asegúrate de que esta ruta sea correcta
    disableWebdriverStepsReporting: false, // Para asegurarte de que se registren los pasos
    disableWebdriverScreenshotsReporting: false // Si deseas registrar las capturas de pantalla
  },
  name: 'framework_angela',
}

}


