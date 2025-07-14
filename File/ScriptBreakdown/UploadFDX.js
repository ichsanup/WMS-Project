const { Builder, By, until, Actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
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
    await driver.sleep(2500);
    let uploadFDX = await driver.findElement(
      By.xpath(
        '//button[@class="flex items-center rounded-lg bg-[#f97066] px-4 py-2 text-white transition-colors hover:bg-[#e05d53] disabled:opacity-50"]'
      )
    );
    uploadFDX.click();
    await driver.sleep(12000);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
