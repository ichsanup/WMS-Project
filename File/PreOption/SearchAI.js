const { Builder, By, until, actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { loginpre } = require("../LoginPre");
const { Key } = require("selenium-webdriver");

describe("Search AI", async function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await loginpre(driver);
  });

  it("Search AI Pre", async function () {
    await driver.executeScript("document.body.style.zoom='65%'");
    const search = await driver.findElement(By.id("searchInput"));
    await search.sendKeys("Pria Indonesia umur diatas 25 tahun", Key.ENTER);
    await driver.sleep(2000);
    await driver.actions().sendKeys(Key.PAGE_DOWN).perform();
  });
});
