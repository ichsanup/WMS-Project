const { Builder, By, until, Actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { login } = require("../LoginHelper");

describe("Script Breakdown", function () {
  let driver;

  before(async function () {
    let options = new chrome.Options();
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("Script Breakdownd Section", async function () {
    let uploadFDX = await driver.findElement(
      By.xpath(
        '//button[@class="flex items-center rounded-lg bg-[#f97066] px-4 py-2 text-white transition-colors hover:bg-[#e05d53]"]'
      )
    );
    uploadFDX.click();
    await driver.sleep(5000);
    // const fileInput = await driver.findElement(
    //   By.xpath('//input[@type="file"]')
    // );
    // const filePath = "C:\\Users\\ichsa\\Downloads\\Sample.fdx";
    // await fileInput.sendKeys(filePath);
    await driver.sleep(1000);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
