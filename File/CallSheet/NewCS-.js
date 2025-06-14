const { Builder, By, until } = require("selenium-webdriver");
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
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Sample));
    chooseFile.click();
    await driver.sleep(500);
    const csMenu = await driver.findElement(
      By.xpath(
        "//a[contains(@href, '/ph/call-sheets') and contains(text(), 'Call Sheet')]"
      )
    );
    csMenu.click();
    await driver.sleep(500);
    let createNew = await driver.findElement(By.xpath(GlobalWMS.Create_New));
    createNew.click();
    await driver.sleep(500);
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
    await driver.sleep(3500);
    //Upload File Otomatis
    // let fileInput = await driver.findElement(By.xpath('//input[@type="file"]'));
    // const filePath =
    //   "C:UsersichsaOneDrive - student.gunadarma.ac.idGambarTampilan awal.png";
    // driver.sleep(500);
    // await fileInput.sendKeys(filePath);
    // await driver.wait(until.elementIsVisible(fileInput), 10000);
    let uploadImage = await driver.findElement(
      By.xpath('//img[contains(@class,"object-cover")]')
    );
    const isDisplayedImg = await uploadImage.isDisplayed();
    assert(await uploadImage.isDisplayed(), "Image was not uploaded");
    console.log("Upload berhasil dan gambar muncul.", isDisplayedImg);
    await driver.sleep(1000);
    let btnSaveCS = await driver.findElement(
      By.xpath(
        '//button[@class="inline-flex h-12 w-[280px] items-center justify-center rounded-lg bg-[#E8655B] px-2 py-1 text-white"]'
      )
    );
    await btnSaveCS.click();
    await driver.sleep(1500);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
