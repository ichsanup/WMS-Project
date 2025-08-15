const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const { login } = require("../LoginHelper"); // ← import helper login
const GlobalWMS = require("../GlobalWMS");

describe("View Call Sheet", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver); // ← panggil login sebelum test
  });

  it("WMS Website", async function () {
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Baby));
    chooseFile.click();
    await driver.sleep(2500);
    const DateShow = await driver.findElement(
      By.xpath(
        '//div[@class="flex flex-1 items-center justify-center rounded-md px-4 py-2"]'
      )
    );
    //Create condition "if" with try and catch
    if (DateShow.length === 0) {
      const btnAddND = await driver.findElement(
        By.className(
          "flex min-h-[43px] min-w-[186px] items-center gap-2 rounded-lg bg-[#F97066] px-8 py-2 font-semibold text-white"
        )
      );
      btnAddND.click();
      await driver.sleep(500);
      const clickDate = await driver.findElement(
        By.xpath(
          '//div[@class="date-picker-container flex min-h-[72px] w-full items-center justify-center rounded-t-lg border border-[#42C1E3] bg-[#ECF9FC] px-9 py-2 border-dashed"]'
        )
      );
      await driver.wait(until.elementIsVisible(clickDate), 1000);
      await driver.actions({ bridge: true }).doubleClick(clickDate).perform();
      await driver.sleep(500);
      const selectDate = await driver.findElement(
        By.xpath(
          '//div[@class="flex h-8 select-none items-center justify-center rounded-full font-publicSans text-sm font-normal cursor-pointer hover:bg-gray-100"]'
        )
      );
      await driver.wait(until.elementIsVisible(selectDate), 1000);
      selectDate.click();
      await driver.sleep(500);
    } else {
      console.log("DateShow is already present, no need to add");
      let textbtn_CS = await driver.findElement(
        By.xpath(
          '//button[@class="flex items-center gap-1 rounded-md px-3 py-1.5 text-[#E8655B]"]'
        )
      );
      textbtn_CS.click();
      await driver.sleep(500);
      let isEnabledCS = await driver.findElement(
        By.xpath(
          '//h1[@class="font-inter text-xl font-bold leading-7 tracking-[0.15px]"]'
        )
      );
      const CallSheet = await isEnabledCS.isEnabled();
      expect(CallSheet).to.be.true;
      console.log("Berhasil masuk ke Call Sheet", CallSheet);
    }
    await driver.sleep(1000);
  });
  after(async function () {
    if (driver) {
      await driver.quit(); // pastikan browser ditutup setelah test selesai
    }
  });
});
