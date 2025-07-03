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
    await driver.executeScript("document.body.style.zoom='65%'");
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Sample));
    chooseFile.click();
    await driver.sleep(1500);
    for (let i = 0; i < Loop_section; i++) {
      try {
        await driver.sleep(2500);
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
        await driver.sleep(1000);

        // 🔥 Check if btnDelete exists
        const btnDeleteList = await driver.findElements(
          By.xpath(
            "//div[@class='relative overflow-hidden']//span[@class='material-icons-outlined text-[#E8655B]'][normalize-space()='delete']"
          )
        );
        await driver.sleep(1000);

        if (btnDeleteList.length === 0) {
          console.log("No more data to delete.");
          break; // ❗ exit loop if no delete button found
        }

        const btnDelete = btnDeleteList[0];
        await btnDelete.click();
        await driver.sleep(500);

        const btnDelete2List = await driver.findElements(
          By.xpath(
            '//button[@class="w-1/3 rounded-md bg-[#f97066] py-3 text-center text-lg font-medium text-white transition-colors hover:bg-[#e05d53]"]'
          )
        );

        if (btnDelete2List.length > 0) {
          await btnDelete2List[0].click();
        }

        // ✅ Wait and confirm delete success
        try {
          await driver.wait(async () => {
            const elementsbtnDelete2 = await driver.findElements(
              By.xpath(
                '//button[@class="w-1/3 rounded-md bg-[#f97066] py-3 text-center text-lg font-medium text-white transition-colors hover:bg-[#e05d53]"]'
              )
            );
            return elementsbtnDelete2.length === 0;
          }, 1000);

          console.log("Data success to delete");
        } catch (error) {
          console.error("Data failed to delete", error);
        }

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
