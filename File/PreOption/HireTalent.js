const { Builder, By, until, actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { loginpre } = require("../LoginPre");
const { Key } = require("selenium-webdriver");

describe("Hire Talent", async function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await loginpre(driver);
  });

  it("Hire Talent as PH", async function () {
    await driver.executeScript("document.body.style.zoom='60%'");
    await driver.executeScript("window.scrollBy(0,350)");
    await driver.sleep(1000);
    let selectTalent = await driver.findElement(
      By.xpath(
        '(//div[@class="relative flex min-h-[400px] w-full max-w-[323px] flex-col items-start overflow-hidden rounded-3xl border-2 border-[#B9EBF7] bg-white lg:min-h-[534px] lg:w-[323px] lg:min-w-[240px]"])[8]'
      ),
      1500
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      selectTalent
    );
    await selectTalent.click();
    await driver.sleep(500);
    await driver.actions().sendKeys(Key.UP).perform();
    // await driver.sleep(1500);
    let selectCalendar = await driver.findElement(
      By.xpath(
        '//div[@class="flex items-center justify-between"]//span[@class="material-icons text-[24px]"]'
      )
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      selectCalendar
    );
    await driver.sleep(500);
    await selectCalendar.click();
    await driver.sleep(500);
    const selectDate = await driver.findElement(
      By.xpath(
        "//div[contains(@class, 'flex') and contains(@class, 'h-8') and contains(@class, 'cursor-pointer') and not(contains(@class, 'cursor-not-allowed')) and not(contains(@class, 'text-gray-300')) and not(contains(@class, 'text-red-500'))]"
      )
    );
    await driver.wait(until.elementIsVisible(selectDate), 1200);
    selectDate.click();
    const endTime = await driver.findElement(
      By.xpath('(//div[@class="css-19qbgqt-indicatorContainer"])[2]')
    );
    await endTime.click();
    const selectendTime = await driver.findElement(
      By.xpath("//*[contains(text(), '05:00 WIB')]")
    );
    await selectendTime.click();
    await driver.sleep(1000);
    const startTime = await driver.findElement(
      By.xpath('(//div[@class="css-19qbgqt-indicatorContainer"])[1]')
    );
    await startTime.click();
    const selectstartTime = await driver.findElement(
      By.xpath("//*[contains(text(), '03:00 WIB')]")
    );
    await selectstartTime.click();
    await driver.sleep(1000);
    let btnCeklis = await driver.findElement(
      By.xpath(
        '//button[@class="material-icons-round text-[24px] cursor-pointer text-[#42C1E3]" and text()="check_circle_outline"]'
      )
    );
    await btnCeklis.click();
    await driver.sleep(1000);
    let btnClose = await driver.findElement(
      By.xpath('//button[text()="Close"]')
    );
    await btnClose.click();
    let btnHire = await driver.findElement(
      By.xpath(
        '//button[@class="mt-5 flex w-[349px] max-w-full flex-col overflow-hidden text-base font-bold text-white"]//div[text()="Hire Now"]'
      )
    );
    await btnHire.click();
    await driver.sleep(1000);
  });
  // after(async function () {
  //   if (driver) {
  //     await driver.quit(); // pastikan browser ditutup setelah test selesai
  //   }
  // });
});
