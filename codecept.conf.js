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
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  },
  name: 'framework_angela'
}
