const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const { login } = require("../LoginHelper");
const GlobalWMS = require("../GlobalWMS");

describe("Timeline", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("Timeline Page", async function () {
    await driver.executeScript("document.body.style.zoom='65%'");
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Baby));
    await chooseFile.click();
    await driver.sleep(1000);
    const menuTimeline = await driver.findElement(
      By.xpath('//a[contains(text(), "Timeline")]')
    );
    const EnableTimeline = await menuTimeline.isEnabled();
    expect(EnableTimeline).to.be.true;
    await menuTimeline.click();
    await driver.sleep(2500);
    let cardview = await driver.findElement(
      By.xpath('//div[@id="draggable-scene-9019"]')
    );
    const Enablecardview = await cardview.isEnabled();
    expect(Enablecardview).to.be.true;
    await driver.executeScript("arguments[0].scrollIntoView(true);", cardview);
    await driver.sleep(1000);
    await cardview.click();
    let lihatScript = await driver.findElement(
      By.xpath(
        '//button[@class="flex w-full items-center justify-center rounded-lg border border-[#E8655B] py-3 text-[#E8655B] hover:bg-red-50" and text()="Lihat Script"]'
      )
    );
    await driver.sleep(1000);
    await lihatScript.click();
    await driver.sleep(2000);
    let backTimeline = await driver.findElement(
      By.xpath(
        '//div[@class="z-10 items-center justify-center rounded-t-lg border border-b-0 px-4 inline-flex h-9 self-end bg-[#F0F0F0] py-2 transition-all hover:cursor-pointer hover:border-b-0 hover:bg-white active:bg-white"]'
      )
    );
    await backTimeline.click();
    await driver.sleep(1500);
    cardview = await driver.findElement(
      By.xpath('//div[@id="draggable-scene-9019"]')
    );
    await driver.executeScript("arguments[0].scrollIntoView(true);", cardview);
    await cardview.click();
    await driver.sleep(1000);
    let lihatCS = await driver.findElement(
      By.xpath(
        '//button[@class="flex w-full items-center justify-center rounded-lg bg-[#E8655B] py-3 text-white hover:bg-[#d85a50]" and text()="Lihat Call Sheets"]'
      )
    );
    const EnableCS = await lihatCS.isEnabled();
    expect(EnableCS).to.be.true;
    await lihatCS.click();
    await driver.sleep(1000);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
