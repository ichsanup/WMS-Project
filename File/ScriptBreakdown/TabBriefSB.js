const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const { login } = require("../LoginHelper");
const GlobalWMS = require("../GlobalWMS");

describe("Tab Briefing Scene", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("Test New Tab on Briefing Scene", async function () {
    await driver.executeScript("document.body.style.zoom='65%'");
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Sample));
    await chooseFile.click();
    await driver.sleep(4500);
    const scenes = await driver.findElement(
      By.xpath(
        '//div[@class="flex-grow cursor-pointer text-center underline hover:text-[#42C1E3] text-white"]'
      )
    );
    await scenes.click();
    await driver.sleep(4000);
    const btnTabBrief = await driver.findElement(
      By.xpath(
        '(//button[@class="rounded-full bg-white p-1 text-[#E8655B] hover:bg-gray-100"])[2]'
      )
    );
    await btnTabBrief.click();
    await driver.sleep(3500);
    const button = await driver.findElement(
      By.xpath('//button[contains(text(), "Briefing")]')
    );
    const text = await button.getText();
    expect(text).to.include("Briefing");
    await driver.sleep(1000);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
