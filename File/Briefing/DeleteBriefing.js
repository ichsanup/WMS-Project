const { Builder, By, until, Actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const { login } = require("../LoginHelper");
const GlobalWMS = require("../GlobalWMS");
const loop_section = 8;

describe("WMS Director Test", function () {
  let driver;

  before(async function () {
    let options = new chrome.Options();
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("WMS Website", async function () {
    await driver.executeScript("document.body.style.zoom='65%'"); //zoom out page
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Baby));
    chooseFile.click();
    await driver.sleep(1500);
    const menuBriefing = await driver.findElement(
      By.xpath('//a[contains(text(), "Briefing")]')
    );
    menuBriefing.click();
    //Hold and Click
    for (let i = 0; i < loop_section; i++) {
      try {
        const holdTarget = await driver.wait(
          until.elementLocated(
            By.xpath(
              '//div[@class="cursor-pointer px-4 py-3 transition-colors border-r-4 border-[#42C1E3] bg-[#ECF9FC]"]//div[@class="flex items-center justify-between"]'
            )
          ),
          10000
        );
        await driver.wait(until.elementIsVisible(holdTarget), 2000);
        const actions = driver.actions({ async: true });
        await actions
          .move({ origin: holdTarget })
          .press()
          .pause(2000)
          .release()
          .perform();
        const btn_delete = await driver.wait(
          until.elementLocated(
            By.xpath(
              '//button[@class="text-[#f97066] hover:text-[#e05d53]"]//span[text()="delete"]'
            )
          )
        );
        btn_delete.click();
        const btn_Hapus = await driver.wait(
          until.elementLocated(
            By.xpath(
              '//button[@class="rounded-md bg-[#f97066] px-[60px] py-3 text-lg font-bold text-white"][text()="Hapus"]'
            )
          )
        );
        btn_Hapus.click();
        await driver.sleep(500);
      } finally {
        console.log("Briefing Berhasil di Delete");
      }
    }
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
