//untuk menggunakan sebuah web driver
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const { login } = require("../LoginHelper");

describe("WMS Login Test", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });
  it("WMS Website", async function () {
    await driver.executeScript("document.body.style.zoom='65%'");
    await driver.sleep(1500);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
