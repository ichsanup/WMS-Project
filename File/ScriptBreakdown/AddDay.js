const { Builder, By, until, Actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { login } = require("../LoginHelper");
const Loop_section = 4;

describe("Script Breakdown", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("Add New Day", async function () {
    // await driver.executeScript("document.body.style.zoom='65%'");
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Sample));
    chooseFile.click();
    await driver.sleep(1000);
    for (let i = 0; i < Loop_section; i++) {
      await driver.sleep(4500);
      const btnAddND = await driver.findElement(
        By.xpath(
          '//button[@class="flex min-h-[43px] min-w-[186px] items-center gap-2 rounded-lg bg-[#F97066] px-8 py-2 font-semibold text-white"]'
        )
      );
      await driver.sleep(1500);
      btnAddND.click();
      await driver.sleep(4500);
      try {
        const clickDate = await driver.findElement(
          By.xpath(
            '//div[@class="date-picker-container flex min-h-[72px] w-full items-center justify-between border border-b-0 border-[#2C2C2C] bg-[#434343] border-dashed transition-colors duration-200"]//span[text()="Tap untuk membuka kalender"]'
          )
        );
        await driver.wait(until.elementIsVisible(clickDate), 1000);
        clickDate.click();
        await driver.sleep(1500);
      } catch (error) {
        console.log("Calendar not found", error);
      }
      // await driver.actions({ bridge: true }).doubleClick(clickDate).perform();
      await driver.sleep(2500);
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
    }
    await driver.sleep(500);
  });
  after(async function () {
    if (driver) {
      await driver.quit(); // pastikan browser ditutup setelah test selesai
    }
  });
});
