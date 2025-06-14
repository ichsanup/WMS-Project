const { Builder, By, until, Actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
require("../GlobalVisit");

describe("WMS Director Test", function () {
  it("WMS Website", async function () {
    Link = await driver.get(GlobalWMS.URL);
    PopupAuth = await driver.get(GlobalWMS.PopupAuth);
    let emailField = await driver.findElement(By.id("emailInput"));
    await emailField.sendKeys(GlobalWMS.Email_CS1);

    let passwordField = await driver.findElement(By.id("passwordInput"));
    await passwordField.sendKeys(GlobalWMS.Password_CS);
    let btnLogin = await driver.findElement(
      By.xpath(
        "//*[@class='w-full rounded-lg bg-red-500 p-3 font-bold text-white hover:bg-red-600']"
      )
    );
    await btnLogin.click();
    await driver.sleep(500);
    let title = await driver.findElement(
      By.xpath(
        '//a[@class="my-auto self-stretch transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"][text()="Home"]'
      )
    );
    await driver.wait(until.elementIsEnabled(title));
    //Change URL
    await driver.get(GlobalWMS.URL3);
    await driver.wait(until.urlContains("/ph/script-breakdown"), 500);
    const currentURL = await driver.getCurrentUrl();
    expect(currentURL).to.equal(GlobalWMS.URL3);
    await driver.sleep(500);
    const chooseFile = await driver.findElement(
      By.xpath(
        '//h3[contains(text(), "Sample.fdx")]/ancestor::div[contains(@class, "mb-2")]/following-sibling::div//span[text()="Lihat script"]'
      )
    );
    chooseFile.click();
    await driver.sleep(500);
    const menuDirect = await driver.findElement(
      By.xpath('//a[text()=concat("Director", "\'", "s Briefing")]')
    );
    menuDirect.click();
    await driver.sleep(500);
    let exports = await driver.findElement(
      By.xpath(
        '//button[@class="flex items-center rounded-md border border-[#f97066] px-4 py-2 text-[#f97066] transition-colors hover:bg-[#fff8f8]"][text()="Ekspor briefings"]'
      )
    );
    exports.click();
    await driver.sleep(500);
    const selectBriefing = await driver.findElement(
      By.xpath(
        '//div[@class="w-full px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center cursor-pointer"]//span[@class="material-icons text-gray-500"][text()="keyboard_arrow_down"]'
      )
    );
    let isVisibleSubmit = await selectBriefing.isDisplayed();
    console.log("Element berhasil ditemukan", isVisibleSubmit);
    expect(isVisibleSubmit).to.be.true;
    selectBriefing.click();
    await driver.sleep(500);
    //scrolldown into selected element in pop up
    let scrollPopup = await driver.findElement(
      By.xpath(
        '//label[@class="flex items-center space-x-2 cursor-pointer"]//span[@class="text-[#434343] "][text()="test"]'
      )
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      scrollPopup
    );
    scrollPopup.click();
    let upArrow = await driver.findElement(
      By.xpath(
        '//span[@class="material-icons text-gray-500"][text()="keyboard_arrow_up"]'
      )
    );
    upArrow.click();
    let exportFile = await driver.findElement(
      By.xpath(
        '//button[@class="flex items-center justify-center text-base font-medium bg-[#E8655B] text-white hover:bg-[#d55a50]"][text()="Export"]'
      )
    );
    exportFile.click();
    await driver.sleep(1000);
  });
});
