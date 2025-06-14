const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const { login } = require("../LoginHelper"); // ← import helper login
const GlobalWMS = require("../GlobalWMS");

describe("Manage Page", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver); // ← panggil login sebelum test
  });

  it("WMS Website", async function () {
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.CallSheet));
    chooseFile.click();
    await driver.sleep(2500);
    //Create condition "if" with try and catch
    try {
      const DateShow = await driver.findElements(
        By.xpath(
          '//div[@class="flex flex-1 items-center justify-center rounded-md px-4 py-2"]'
        )
      );

      if (DateShow.length === 0) {
        // Jika elemen tidak ditemukan, klik tombol AddND
        const btnAddND = await driver.findElement(
          By.className(
            "flex min-h-[43px] min-w-[186px] items-center gap-2 rounded-lg bg-[#F97066] px-8 py-2 font-semibold text-white"
          )
        );
        await btnAddND.click();
        await driver.sleep(1500);
        const clickDate = await driver.findElement(
          By.xpath(
            '//div[@class="date-picker-container flex min-h-[72px] w-full items-center justify-between border border-b-0 border-[#2C2C2C] bg-[#434343] border-dashed transition-colors duration-200"]//span[text()="Tap untuk membuka kalender"]'
          )
        );
        await driver.wait(until.elementIsVisible(clickDate), 2000);
        clickDate.click();
        // await driver.actions({ bridge: true }).doubleClick(clickDate).perform();
        await driver.sleep(500);

        const selectDate = await driver.findElement(
          By.xpath(
            '//div[@class="flex h-8 select-none items-center justify-center rounded-full font-publicSans text-sm font-normal cursor-pointer hover:bg-gray-100"]'
          )
        );
        await driver.wait(until.elementIsVisible(selectDate), 1000);
        await selectDate.click();
        await driver.sleep(2500);
      } else {
        console.log("DateShow is already present, no need to add");

        const textbtn_CS = await driver.findElement(
          By.xpath(
            '//button[@class="flex items-center gap-1 rounded-md px-3 py-1.5 text-[#E8655B]"]'
          )
        );
        await textbtn_CS.click();
        await driver.sleep(500);

        const isEnabledCS = await driver.findElement(
          By.xpath(
            '//h1[@class="font-inter text-xl font-bold leading-7 tracking-[0.15px]"]'
          )
        );
        const CallSheet = await isEnabledCS.isEnabled();
        expect(CallSheet).to.be.true;
        console.log("Berhasil masuk ke Call Sheet", CallSheet);
      }

      await driver.sleep(500);

      const btn_arrow = await driver.findElement(
        By.xpath(
          '//div[@class="flex flex-col bg-white p-5"]//button[@class="material-icons my-2 inline-flex h-6 w-6 items-center justify-center self-start rounded-full border border-[#E8655B] text-[24px] text-[#E8655B]"]'
        )
      );
      const isDisplayed = await btn_arrow.isDisplayed();
      expect(isDisplayed).to.be.true;
      await btn_arrow.click();
      await driver.sleep(500);

      const btn_manage = await driver.findElement(
        By.xpath(
          '//li[@class="cursor-pointer px-5 py-3 "]//span[@class="font-inter text-base font-semibold"]'
        )
      );
      await btn_manage.click();
      await driver.sleep(500);

      const day1 = await driver.findElement(
        By.xpath(
          '//div[@class="flex min-w-[30px] items-center justify-center border-r border-[#42C1E3]"]'
        )
      );
      await day1.click();
      await driver.sleep(500);

      const day1page = await driver.findElement(
        By.xpath('//input[@id="sheet-search"][@value="Call Sheet Day 1"]')
      );
      await driver.sleep(500);

      const isDisplayDay1 = await day1page.isDisplayed();
      const isEnabled = await day1page.isEnabled();
      expect(isDisplayDay1).to.be.true;
      expect(isEnabled).to.be.true;
      console.log("Berhasil masuk melalui Manage", isEnabled);
    } catch (error) {
      console.error("Tidak berhasil dijalankan:", error.message);
    }
    await driver.sleep(1000);
  });
  after(async function () {
    if (driver) {
      await driver.quit(); // pastikan browser ditutup setelah test selesai
    }
  });
});
