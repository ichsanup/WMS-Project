const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { regist } = require("../RegistHelper");
const { Key } = require("selenium-webdriver");

describe("WMS Regist Test", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await regist(driver);
  });

  it("WMS Regist", async function () {
    await driver.executeScript("document.body.style.zoom='65%'");
    //Webdriverwait in mocha
    const waitinputName = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//input[@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "][@name="name"][@placeholder="Enter your name"]'
        )
      ),
      1000
    );
    await driver.wait(until.elementIsVisible(waitinputName), 1000);
    const isDisplayedName = await waitinputName.isDisplayed();
    expect(isDisplayedName).to.be.true;
    console.log("Field Name Ditemukan");
    await waitinputName.sendKeys(GlobalWMS.Data_Name);
    let inputId = await driver.findElement(
      By.xpath(
        '//input[@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "][@name="id_number"]'
      ),
      1000
    );
    await inputId.sendKeys(GlobalWMS.Data_ID);
    let email = await driver.findElement(
      By.xpath(
        '//input[@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "][@name="email"]'
      ),
      1000
    );
    await email.sendKeys(GlobalWMS.Email_Random);
    let password = await driver.findElement(
      By.xpath(
        '//input[@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "][@name="password"]'
      ),
      1000
    );
    await password.sendKeys(GlobalWMS.Data_Password);
    let confirmpw = await driver.findElement(
      By.xpath(
        '//input[@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "][@name="confirmPassword"]'
      ),
      1000
    );
    await confirmpw.sendKeys(GlobalWMS.Data_Password);
    try {
      driver.sleep(1000);
      let btnChecklist = await driver.findElement(
        By.xpath(
          '(//label[@class="flex items-center gap-2"]//input[@name="agency_interest" and @type="checkbox"])[1]'
        )
      );
      await driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        btnChecklist
      );
      await btnChecklist.click();
      await driver.sleep(1000);
      const linkTiktok = await driver.findElement(
        By.xpath('//input[@name="tiktok_link"]')
      );
      await linkTiktok.sendKeys("https://vt.tiktok.com/ZSrBbGEX6/");
      let btnRegist = await driver.findElement(
        By.xpath(
          '//button[@class="w-full rounded-lg bg-red-500 py-3 font-bold text-white hover:bg-red-600 disabled:bg-red-300" and text()="Register Now"]'
        ),
        1000
      );
      await driver.wait(until.elementIsVisible(btnRegist), 1000);
      await btnRegist.click();
      await driver.sleep(62000);
      const btnResendEmail = await driver.findElement(
        By.xpath(
          '//button[@class="w-full rounded-lg py-3 text-xl font-medium text-white bg-red-500 hover:bg-red-600"][text()="Resend Email"]'
        )
      );
      await btnResendEmail.click();
    } catch (error) {
      console.log("Gagal Change Email", error.message);
    }
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
