const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const { login } = require("../LoginHelper");
const GlobalWMS = require("../GlobalWMS");

describe("Add Briefing", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("Add Briefing Timeline Page", async function () {
    await driver.executeScript("document.body.style.zoom='65%'");
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.CallSheet));
    await chooseFile.click();
    await driver.sleep(1000);
    const menuTimeline = await driver.findElement(
      By.xpath('//nav[@class="flex w-full gap-12"]//a[text()="Timeline"]')
    );
    const EnableTimeline = await menuTimeline.isEnabled();
    expect(EnableTimeline).to.be.true;
    await menuTimeline.click();
    await driver.sleep(1000);
    let cardview = await driver.findElement(
      By.xpath('//div[@id="draggable-scene-5167"]')
    );
    const Enablecardview = await cardview.isEnabled();
    expect(Enablecardview).to.be.true;
    await driver.executeScript("arguments[0].scrollIntoView(true);", cardview);
    await driver.sleep(1000);
    await cardview.click();
    const addBrief = await driver.findElement(
      By.xpath(
        '//button[@class="rounded-full bg-white p-1 text-[#E8655B] hover:bg-gray-100"]//span[text()="note_add"]'
      )
    );
    const IsEnabled = await addBrief.isEnabled();
    expect(IsEnabled).to.be.true;
    await driver.sleep(1000);
    await addBrief.click();
    const id = await driver.findElement(By.xpath('//input[@id="title"]'));
    await id.sendKeys("Test from Briefing");
    const textarea = await driver.findElement(
      By.xpath('//textarea[@id="description"]')
    );
    await textarea.sendKeys("Test Description");
    let btnRecord = await driver.findElement(
      By.xpath(
        '//button[@type="button"][@class="flex h-12 w-[126px] items-center justify-center rounded-full border-[3px] border-black bg-white"]'
      )
    );
    await driver.executeScript("arguments[0].scrollIntoView(true);", btnRecord);
    await btnRecord.click();
    await driver.sleep(5000);
    const btnStop = await driver.findElement(
      By.xpath(
        '//button[@type="button"][@class="flex h-12 w-12 items-center justify-center rounded-full border cursor-pointer border-gray-300"]'
      )
    );
    await btnStop.click();
    await driver.sleep(1000);
    const btnTambahbrief = await driver.findElement(
      By.xpath('//button[@type="submit" and text()="Tambah Brief"]')
    );
    await btnTambahbrief.click();
    await driver.sleep(1500);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
