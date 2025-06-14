const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { regist } = require("../RegistHelper");

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
    let phoneNumber = await driver.findElement(
      By.xpath(
        '//input[@class="form-control !w-full border px-3 py-2 border-gray-300 bg-white "][@value="+62"]'
      ),
      1000
    );
    await phoneNumber.sendKeys(GlobalWMS.Phone_Dummy);
    let email = await driver.findElement(
      By.xpath(
        '//input[@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "][@name="email"]'
      ),
      1000
    );
    await email.sendKeys(GlobalWMS.Email_Host);
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
      let linkTiktok = await driver.findElement(
        By.xpath(
          '//input[@class="h-9 w-full rounded-md border px-3 py-2 text-sm placeholder:text-[#D9D9D9] border-[#0000001A] focus:outline-[#E8655B]"]'
        )
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
      console.log("Button Regist Berhasil Diklik");

      await driver.sleep(1000);
      // let currentURL = await driver.getCurrentUrl();
      // console.log("Current URL:", currentURL);
      // expect(currentURL).to.equal(
      //   "https://admin:68BHr63vBpH2G7jh@qctest---frontend-shooting-a6e4wwojjq-et.a.run.app/register/talent/form"
      // );
    } catch (error) {
      console.log("URL tidak sesuai", error.message);
    }
    await driver.sleep(1000);
  });
});
