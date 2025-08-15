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

  it("Delete Date", async function () {
    await driver.executeScript("document.body.style.zoom='75%'");
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Baby));
    chooseFile.click();
    await driver.sleep(4000);
    for (let i = 0; i < Loop_section; i++) {
      try {
        await driver.sleep(1200);
        const swipeLeft = await driver.findElement(
          By.xpath(
            '//div[@class="flex flex-1 items-center justify-center rounded-md px-4 py-2"]'
          )
        );
        await driver
          .actions({ bridge: true })
          .move({ origin: swipeLeft })
          .press()
          .move({ origin: swipeLeft, x: -700, y: 0 })
          .release()
          .perform();
        await driver.sleep(1200);

        // 🔥 Check if btnDelete exists
        const btnDeleteList = await driver.findElements(
          By.xpath(
            '//button[@class="flex h-12 w-12 items-center justify-center rounded-full"]//span[text()="delete"]'
          )
        );
        await driver.sleep(1200);
        if (btnDeleteList.length === 0) {
          console.log("No more data to delete.");
          break; // ❗ exit loop if no delete button found
        }
        const btnDelete = btnDeleteList[0];
        await btnDelete.click();
        await driver.sleep(1200);
        const btnHapus = await driver.findElement(
          By.xpath(
            '//button[@class="w-1/3 rounded-md bg-[#f97066] py-3 text-center text-lg font-medium text-white transition-colors hover:bg-[#e05d53]"]'
          )
        );
        await btnHapus.click();
        await driver.sleep(1000);
      } catch (error) {
        console.error("Data sudah tidak ada lagi");
        break; // ❗ break if unexpected error happens
      }
    }
  });
  after(async function () {
    if (driver) {
      await driver.quit(); // pastikan browser ditutup setelah test selesai
    }
  });
});
