const { Builder, By } = require('selenium-webdriver');
const { Eyes, Target, ClassicRunner, Configuration, BatchInfo } = require('@applitools/eyes-selenium');

(async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  // Applitools setup
  const runner = new ClassicRunner();
  const eyes = new Eyes(runner);

  const config = new Configuration();
  config.setApiKey(process.env.APPLITOOLS_API_KEY);
  config.setAppName('Datawords Site');
  config.setTestName('Services Page - FR');
  config.setBatch(new BatchInfo('Datawords Visual Test Batch'));

  eyes.setConfiguration(config);

  try {
    // Start test
    await eyes.open(driver);

    // Navigate to your target page
    await driver.get('https://datawordsdev.kinsta.cloud/fr/services/');

    // Optional: wait for animations/load
    await driver.sleep(2000);

    // Full page visual snapshot
    await eyes.check('Services Page FR', Target.window().fully());

    await eyes.closeAsync();
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await driver.quit();
    const results = await runner.getAllTestResults(false);
    console.log(results);
  }
})();
