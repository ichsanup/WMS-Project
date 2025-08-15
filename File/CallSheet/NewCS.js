const { Builder, By, until, Button } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const { login } = require("../LoginHelper");
const GlobalWMS = require("../GlobalWMS");

describe("WMS Director Test", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("WMS Website", async function () {
    // await driver.executeScript("document.body.style.zoom='65%'");
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Baby));
    chooseFile.click();
    await driver.sleep(500);
    const csMenu = await driver.findElement(
      By.xpath(
        "//a[contains(@href, '/ph/call-sheets') and contains(text(), 'Call Sheet')]"
      )
    );
    csMenu.click();
    await driver.sleep(1500);
    const manageDay = await driver.findElement(
      By.xpath(
        '//div[@class="flex min-h-[52px] min-w-[435px] cursor-pointer items-center border-x border-[#42C1E3] px-5"]'
      )
    );
    await manageDay.click();
    await driver.sleep(1000);
    const createNew = await driver.findElement(By.xpath(GlobalWMS.Create_New));
    await driver.executeScript("arguments[0].scrollIntoView(true);", createNew);
    await driver.wait(until.elementIsVisible(createNew), 1000);
    await driver.wait(until.elementIsEnabled(createNew), 1000);
    await driver.sleep(500);
    await createNew.click();
    await driver.sleep(1500);
    let callsheetExpected = await driver.findElement(
      By.xpath('//div[@class="flex flex-col"]//h2[text()="Call Sheet"]')
    );
    let isVisiblecs = await callsheetExpected.isDisplayed();
    console.log("Element berhasil tampil", isVisiblecs);
    expect(isVisiblecs).to.be.true;
    let upload = await driver.findElement(
      By.xpath(
        '//span[@class="material-symbols-outlined text-[48px] text-[#E8655B]"][text()="upload"]'
      )
    );
    upload.click();
    await driver.sleep(4500);
    try {
      const calendar = await driver.findElement(
        By.xpath(
          '//button[@class="flex h-[26px] w-[122px] items-center justify-center rounded-lg border border-[#D5D5D5] text-[10px] font-normal leading-[20px] placeholder-[#D5D5D5] focus:outline-[#E5586B]"]'
        )
      );
      await driver.wait(until.elementIsVisible(calendar), 1000);
      calendar.click();
      await driver.sleep(1500);
    } catch (error) {
      console.log("Calendar not found", error);
    }
    await driver.sleep(1500);
    const selectDate = await driver.findElement(
      By.xpath(
        "//div[contains(@class, 'flex') and contains(@class, 'h-8') and contains(@class, 'cursor-pointer') and not(contains(@class, 'cursor-not-allowed')) and not(contains(@class, 'text-gray-300'))]"
      )
    );
    await driver.wait(until.elementIsVisible(selectDate), 1200);
    selectDate.click();
    await driver.sleep(500);
    try {
      await driver.wait(async () => {
        const elementSelecDate = await driver.findElements(
          By.xpath(
            '//div[@class="flex h-8 select-none items-center justify-center rounded-full font-publicSans text-sm font-normal cursor-pointer hover:bg-gray-100"]'
          )
        );
        return elementSelecDate.length === 0; // Means date  button disappeared
      }, 1000);
      console.log("success selected data");
    } catch (error) {
      console.log("Failed to add Date", error);
    }
    let btnSaveCS = await driver.findElement(
      By.xpath(
        '//button[@class="inline-flex h-12 w-[280px] items-center justify-center rounded-lg bg-[#E8655B] px-2 py-1 text-white"]'
      )
    );
    await btnSaveCS.click();
    await driver.sleep(2500);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
