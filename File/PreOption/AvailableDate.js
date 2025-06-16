const { Builder, By, until, actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { loginpre } = require("../LoginPre");
const { Key } = require("selenium-webdriver");

describe("Available Date Filter", async function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await loginpre(driver);
  });

  it("Test Filter Available Date", async function () {
    await driver.executeScript("document.body.style.zoom='65%'");
    const available = await driver.findElement(
      By.xpath(
        "//button[contains(@class, 'opacity-60') and contains(., 'Availability Date')]"
      )
    );
    await available.click();
    await driver.sleep(500);
    const openCalendar1 = await driver.findElement(
      By.xpath(
        '(//div[@class="flex min-w-[345px] cursor-pointer items-center justify-between rounded-md border px-3 py-2"])[1]'
      )
    );
    await openCalendar1.click();
    const selectDate1 = await driver.findElement(
      By.xpath(
        "//div[contains(@class, 'flex') and contains(@class, 'h-8') and contains(@class, 'cursor-pointer') and not(contains(@class, 'cursor-not-allowed')) and not(contains(@class, 'text-gray-300'))]"
      )
    );
    await driver.wait(until.elementIsVisible(selectDate1), 1200);
    selectDate1.click();
    const btnClose = await driver.findElement(
      By.xpath('//button[text()="Close"]')
    );
    await btnClose.click();
    await driver.sleep(500);
    const openCalendar2 = await driver.findElement(
      By.xpath(
        '(//div[@class="flex min-w-[345px] cursor-pointer items-center justify-between rounded-md border px-3 py-2"])[2]'
      )
    );
    await openCalendar2.click();
    await driver.sleep(500);
    const selectDate2 = await driver.findElement(
      By.xpath(
        "//div[contains(@class, 'flex') and contains(@class, 'h-8') and contains(@class, 'cursor-pointer') and not(contains(@class, 'cursor-not-allowed')) and not(contains(@class, 'text-gray-300'))]"
      )
    );
    await driver.wait(until.elementIsVisible(selectDate2), 1200);
    selectDate2.click();
    await driver.sleep(500);
    const btnClose2 = await driver.findElement(
      By.xpath('//button[text()="Close"]')
    );
    await btnClose2.click();
    const btnApply = await driver.findElement(
      By.xpath(
        '//button[@class="min-w-[178px] self-stretch rounded-lg border border-solid bg-[#E8655B] p-3"]'
      )
    );
    await btnApply.click();
    await driver.sleep(500);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
