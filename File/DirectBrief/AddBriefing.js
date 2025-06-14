const { Builder, By, until, Actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const { login } = require("../LoginHelper");
const randomText = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 8; i++) {
    // generate 8-character random string
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
const Loop_Section = 3;

describe("WMS Director Test", function () {
  let driver;

  before(async function () {
    let options = new chrome.Options();
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("WMS Website", async function () {
    await driver.executeScript("document.body.style.zoom='75%'"); //zoom out page
    const chooseFile = await driver.findElement(
      By.xpath(
        '//h3[contains(text(), "Sample.fdx")]/ancestor::div[contains(@class, "mb-2")]/following-sibling::div//span[text()="Lihat script"]'
      )
    );
    chooseFile.click();
    await driver.sleep(500);
    const menuBriefing = await driver.findElement(
      By.xpath(
        '//a[@class="relative px-[11px] py-[5px] text-sm font-medium text-gray-600 hover:text-gray-900"][text()="Briefing"]'
      )
    );
    menuBriefing.click();
    await driver.sleep(500);
    //Looping new section with for
    for (let i = 0; i < Loop_Section; i++) {
      let newSection = await driver.findElement(
        By.xpath(
          '//button[@class="flex items-center rounded-md bg-[#f97066] px-4 py-2 text-white transition-colors hover:bg-[#e05d53]"][text()="Section Baru"]'
        )
      );
      newSection.click();
      await driver.sleep(1500);
      let isVisiblesection = await newSection.isDisplayed();
      console.log("Element New Section Berhasil Tampil", isVisiblesection);
      expect(isVisiblesection).to.be.true;
      await driver.sleep(1000);
      let inputName = await driver.findElement(
        By.xpath('//input[@id="sectionName"]')
      );
      inputName.sendKeys(randomText());
      await driver.sleep(1000);
      let createSection = await driver.findElement(
        By.xpath('//button[@type="submit"][text()="Buat Section"]')
      );
      createSection.click();
      let isVisiblecreateSection = await createSection.isDisplayed();
      console.log("Element Create Section Terbuat", isVisiblecreateSection);
      expect(isVisiblecreateSection).to.be.true;
      // add briefing
      await driver.sleep(1000);
      // await driver.executeScript("window.scrollBy(0,500);");
      let addBriefing = await driver.findElement(
        By.xpath(
          '//button[@class="mb-3 flex items-center rounded-md bg-[#f97066] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#e05d53]"]'
        )
      );
      addBriefing.click();
      await driver.sleep(500);
      let addTitle = await driver.findElement(
        By.xpath(
          '//input[@class="w-full rounded border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#f97066]" and @id="title"]'
        )
      );
      addTitle.sendKeys(randomText());
      let deskripsi = await driver.findElement(
        By.xpath('//textarea[@id="description"]')
      );
      deskripsi.sendKeys(randomText());
      let btnAddBrief = await driver.findElement(
        By.xpath('//button[@type="submit"]')
      );
      btnAddBrief.click();
      await driver.sleep(1000);
    }
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
