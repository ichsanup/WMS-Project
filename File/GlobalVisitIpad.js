const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver;

before(async function () {
  const options = new chrome.Options();

  // Emulasi iPad Pro
  const mobileEmulation = {
    deviceMetrics: { width: 1024, height: 1366, pixelRatio: 2 },
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
  };

  options.setMobileEmulation(mobileEmulation);

  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  // Global supaya bisa dipakai test lain
  global.driver = driver;
});

after(async function () {
  if (driver) {
    await driver.quit();
  }
});
