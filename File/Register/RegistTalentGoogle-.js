const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
require("../GlobalVisit");

describe("WMS Regist Test", function () {
  it("WMS Regist", async function () {
    this.timeout(10000);
    //Zoom out
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
    let asTalent = await driver.findElement(
      By.xpath(
        '//button[@class="flex w-full items-center justify-center gap-2 rounded-lg bg-red-400 p-3"][@aria-label="Join as Talent"]'
      ),
      1000
    );
    await asTalent.click();
    const btnRegistGoogle = await driver.findElement(
      By.xpath(
        '//button[@class="flex w-full items-center justify-center rounded-lg border border-gray-400 py-3 font-bold text-gray-400 hover:bg-gray-100"]'
      )
    );
    btnRegistGoogle.click();
    await driver.sleep(1000);
  });
});
