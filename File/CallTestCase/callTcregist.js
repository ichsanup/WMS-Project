const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
//call tc
const callTC = require("./callTclogin");
require("../GlobalVisit");

describe("WMS Regist Test", function () {
  it("WMS Regist", async function () {
    this.timeout(10000);
    // Zoom out
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
    await driver.sleep(500);
    await driver.navigate().back();
    let asTalent = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//div[@class="my-auto w-[120px] self-stretch"][text()="Join as Talent"]'
        )
      )
    );
    await asTalent.click();
    await driver.sleep(500);
    let currentURL = await driver.getCurrentUrl();
    console.log("Current URL:", currentURL);
    expect(currentURL).to.equal(
      "https://admin:68BHr63vBpH2G7jh@frontend-shooting-a6e4wwojjq-et.a.run.app/register/talent"
    );
    let btnLogin = await driver.findElement(
      By.xpath(
        '//a[@class="border-b-2 border-red-400 font-bold text-red-400"][text()="Login"]'
      ),
      1000
    );
    await btnLogin.click();
    await driver.sleep(3000);
    //CALL TC LOGIN
    await callTC(driver);
  });
});
