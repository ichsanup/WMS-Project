const { Builder, By, Actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const { login } = require("../LoginHelper");

describe("Toggle Button Pre and Prod", function () {
  let driver;

  before(async function () {
    // let options = chrome.Options();
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("Toggle dari PRE ke PROD atau sebaliknya", async function () {
    // Cek apakah posisi toggle saat ini di PRE
    let isInPre = false;

    try {
      await driver.findElement(
        By.xpath(
          `//div[@class="text-nunito relative flex h-7 w-[84px] cursor-pointer items-center rounded-[44px] bg-[#E8655B] text-[6px] font-medium"]//div[contains(@class, "left-[1px]")]//span[text()="PRE"]`
        )
      );
      isInPre = true;
      console.log("Toggle berada di PRE");
    } catch (err) {
      console.log("Toggle tidak di PRE (mungkin di PROD)");
    }

    await driver.sleep(500); // Delay sedikit sebelum klik

    // Klik toggle (baik dari PRE ke PROD atau sebaliknya)
    const toggleButton = await driver.findElement(
      By.xpath(
        `//div[@class="text-nunito relative flex h-7 w-[84px] cursor-pointer items-center rounded-[44px] bg-[#E8655B] text-[6px] font-medium"]`
      )
    );

    await toggleButton.click();
    await driver.sleep(1000); // Tunggu animasi atau perubahan state

    // Verifikasi toggle sudah pindah
    if (isInPre) {
      const movedToProd = await driver.findElement(
        By.xpath(
          `//div[@class="text-nunito relative flex h-7 w-[84px] cursor-pointer items-center rounded-[44px] bg-[#E8655B] text-[6px] font-medium"]//div[contains(@class, "left-[41px]")]//span[text()="PROD"]`
        )
      );
      expect(await movedToProd.getText()).to.equal("PROD");
      console.log("Toggle berhasil pindah ke PROD");
    } else {
      const movedToPre = await driver.findElement(
        By.xpath(
          `//div[@class="text-nunito relative flex h-7 w-[84px] cursor-pointer items-center rounded-[44px] bg-[#E8655B] text-[6px] font-medium"]//div[contains(@class, "left-[1px]")]//span[text()="PRE"]`
        )
      );
      expect(await movedToPre.getText()).to.equal("PRE");
      console.log("Toggle berhasil pindah ke PRE");
    }
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
