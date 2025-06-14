const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
require("../GlobalVisit");

describe("WMS Regist Test", function () {
  it("WMS Regist", async function () {
    this.timeout(10000);
    await driver.executeScript("document.body.style.zoom='50%'");
    Link = await driver.get(GlobalWMS.URL);
    popup_Auth = await driver.get(GlobalWMS.PopupAuth);
    let Regist = await driver.findElement(
      By.xpath(
        '//button[@class="border-b-2 border-b-[#E8655B] font-bold text-[#E8655B]"][text()="Register Now"]'
      )
    );
    await Regist.click();
    await driver.sleep(500);
    let asHost = await driver.findElement(
      By.xpath(
        '//div[@class="my-auto w-[120px] self-stretch"][text()="Join as Host"]'
      )
    );
    await asHost.click();
    //navigate to back page
    let btnRegistNow = await driver.findElement(
      By.xpath(
        '//button[@class="mb-5 w-full rounded-lg bg-red-500 py-3 font-bold text-white hover:bg-red-600"][text()="Register Now"]'
      )
    );
    await btnRegistNow.click();
    //Webdriverwait in mocha
    const waitinputName = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//input[@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "][@name="name"][@placeholder="Enter your name"]'
        )
      )
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
        '//input[@class="form-control !w-full border px-3 border-gray-300 bg-white "]'
      ),
      1000
    );
    await phoneNumber.sendKeys(GlobalWMS.Data_Phone);
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
    let address = await driver.findElement(
      By.xpath(
        '//textarea[@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "][@name="address"]'
      ),
      1000
    );
    await address.sendKeys(GlobalWMS.Address);
    let btnRegist = await driver.findElement(
      By.xpath(
        '//button[@class="w-full rounded-lg bg-red-500 py-3 font-bold text-white hover:bg-red-600"][text()="Register Now"]'
      ),
      1000
    );
    await btnRegist.click();
    await driver.sleep(1000);
    let currentURL = await driver.getCurrentUrl();
    console.log("Current URL:", currentURL);
    expect(currentURL).to.equal(
      "https://admin:68BHr63vBpH2G7jh@frontend-shooting-a6e4wwojjq-et.a.run.app/register/host/verify"
    );
  });
});
