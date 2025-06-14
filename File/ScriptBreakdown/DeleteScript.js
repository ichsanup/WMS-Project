const { Builder, By, until, Actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { login } = require("../LoginHelper");
const loop_section = 1;

describe("Delete Script", function () {
  let driver;

  before(async function () {
    let options = new chrome.Options();
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("Delete Script Breakdown", async function () {
    for (let i = 0; i < loop_section; i++) {
      try {
        const holdScript = await driver.wait(
          until.elementLocated(
            By.xpath(
              '//div[@class="relative flex cursor-pointer flex-col justify-between rounded-xl border border-[#74D2E8] bg-[#ECF9FC] p-5 shadow-sm transition-all hover:shadow-md"]'
            )
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(holdScript), 2000);
        const action = driver.actions({ async: true });
        await action
          .move({ origin: holdScript })
          .press()
          .pause(2000)
          .release()
          .perform();
        const btn_delete = await driver.wait(
          until.elementLocated(
            By.xpath(
              '//button[@class="absolute right-4 top-4 text-[#f97066] hover:text-[#e05d53]"]//span[text()="delete"]'
            )
          )
        );
        btn_delete.click();
        await driver.sleep(700);
        const btn_confirm = await driver.wait(
          until.elementLocated(
            By.xpath(
              '//button[@class="w-1/3 rounded-md bg-[#f97066] py-3 text-center text-lg font-medium text-white transition-colors hover:bg-[#e05d53]" and text()="Hapus"]'
            )
          )
        );
        btn_confirm.click();
        await driver.sleep(1000);
      } finally {
        console.log("Berhasil melakukan hapus script");
      }
    }
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
