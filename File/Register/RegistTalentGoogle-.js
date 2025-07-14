const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const GlobalWMS = require("../GlobalWMS");

describe("WMS Regist Test", function () {
  let driver;

  before(async function () {
    let options = new chrome.Options();
    options.addArguments("--start-maximized");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    await driver.executeScript("document.body.style.zoom='60%'");
  });

  it("WMS Regist", async function () {
    try {
      Link = await driver.get(GlobalWMS.URL4);
      popup_Auth = await driver.get(GlobalWMS.PopupAuth2);
      const btnRegistGoogle = await driver.findElement(
        By.xpath(
          '//button[@class="mt-5 flex w-full flex-wrap items-center justify-center gap-5 rounded-lg border border-gray-600 p-3 font-bold text-gray-400 hover:bg-slate-100 "]'
        )
      );
      btnRegistGoogle.click();
      await driver.sleep(3000);
      // const email = await driver.findElement(
      //   By.xpath('//div[@class="Xb9hP"]//input[@type="email"]')
      // );
      // await email.sendKeys("ichsanustaf@gmail.com");
      // const nextbtn = await driver.findElement(
      //   By.xpath('(//div[@class="VfPpkd-RLmnJb"])[2]')
      // );
      // await nextbtn.click();
    } catch (error) {
      print("Program gagal", error.message);
    }
  });
  after(async function () {
    await driver.quit();
  });
});
