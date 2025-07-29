require('dotenv').config();
const { Builder } = require('selenium-webdriver');
const { Eyes, Target, ClassicRunner, Configuration } = require('@applitools/eyes-selenium');

(async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  const runner = new ClassicRunner();
  const eyes = new Eyes(runner);

  const config = new Configuration();
  config.setApiKey(process.env.APPLITOOLS_API_KEY);
  config.setAppName('Datawords Visual Test');
  config.setTestName('Services Page Design Baseline');
  config.setBatch({ name: "Visual Comparison Batch" });
  eyes.setConfiguration(config);

  try {
    await eyes.open(driver);

    // Load the Figma design (hosted image)
    await driver.get('https://github.com/hitesh1302/applitools-/blob/main/applitools/services-page-design.jpg');

    // Take visual snapshot
    await eyes.check('Figma Design Snapshot', Target.window().fully());

    await eyes.closeAsync();
  } finally {
    await driver.quit();
    await runner.getAllTestResults();
  }
})();
