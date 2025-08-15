const { Builder, By, until, Actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const LoopSection = 5;
const GlobalWMS = require("../GlobalWMS");
require("../GlobalVisitIpad");

describe("Script Breakdown", function () {
  it("Delete Date Script Breakdown", async function () {
    this.timeout(120000);
    await driver.executeScript("document.body.style.zoom='50%'");
    Link = await driver.get(GlobalWMS.URL);
    PopupAuth = await driver.get(GlobalWMS.PopupAuth);
    let emailField = await driver.findElement(By.id("emailInput"));
    await emailField.sendKeys(GlobalWMS.Email_CS1);

    let passwordField = await driver.findElement(By.id("passwordInput"));
    await passwordField.sendKeys(GlobalWMS.Password_CS);

    let btnLogin = await driver.findElement(
      By.xpath(
        "//*[@class='w-full rounded-lg bg-red-500 p-3 font-bold text-white hover:bg-red-600']"
      )
    );
    await btnLogin.click();
    await driver.sleep(500);

    let btn_prod = await driver.findElement(
      By.xpath('//button[@aria-label="Production"]')
    );
    await btn_prod.click();
    await driver.sleep(500);
    //Zoom out
    await driver.executeScript("document.body.style.zoom='50%'");
    await driver.sleep(1000); // beri waktu tampilan menyesuaikan
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Baby));
    chooseFile.click();
    await driver.sleep(3000);
    for (let i = 0; i < LoopSection; i++) {
      try {
        const swipeLeft = await driver.findElement(
          By.xpath(
            '//div[@class="flex flex-1 items-center justify-center rounded-md px-4 py-2"]'
          )
        );
        await driver
          .actions({ bridge: true })
          .move({ origin: swipeLeft })
          .press()
          .move({ origin: swipeLeft, x: -500, y: 0 })
          .release()
          .perform();
        await driver.sleep(500);

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
    await driver.sleep(1000);
  });
});
