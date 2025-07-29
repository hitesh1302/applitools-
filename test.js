require('dotenv').config();
const { Builder } = require('selenium-webdriver');
const { Eyes, Target, ClassicRunner, Configuration } = require('@applitools/eyes-selenium');

(async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  const runner = new ClassicRunner();
  const eyes = new Eyes(runner);

  const config = new Configuration();
  config.setApiKey(process.env.APPLITOOLS_API_KEY);
  eyes.setMatchLevel('Strict');
  config.setAppName('Datawords Visual Test');
  config.setTestName('Production Page - Live UI');
  config.setBatch({ name: 'Production Visual Comparison Batch' });
  eyes.setConfiguration(config);

  try {
    await eyes.open(driver);

    // Open the real page
    await driver.get('https://datawordsdev.kinsta.cloud/fr/services/');

    // Wait for full load
    await driver.sleep(2000);

    // Take snapshot of live page
    await eyes.check('Live Services Page', Target.window().fully());

    await eyes.closeAsync();
  } finally {
    await driver.quit();
    await runner.getAllTestResults();
  }
})();
