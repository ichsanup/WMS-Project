//untuk menggunakan sebuah web driver
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const { loginpre } = require("../LoginPre");
const { Key } = require("selenium-webdriver");

describe("WMS Login Test", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await loginpre(driver);
  });

  it("WMS Website", async function () {
    await driver.executeScript("document.body.style.zoom='60%'");
    await driver.actions().sendKeys(Key.PAGE_DOWN).perform();
    await driver.sleep(1500);
  });
  after(async function () {
    if (driver) {
      await driver.quit(); // pastikan browser ditutup setelah test selesai
    }
  });
});
