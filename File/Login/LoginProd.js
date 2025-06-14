//untuk menggunakan sebuah web driver
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const GlobalWMS = require("../GlobalWMS");
require("../GlobalVisit");

describe("WMS Login Test", function () {
  it("WMS Website", async function () {
    this.timeout(10000);
    //Zoom out
    await driver.executeScript("document.body.style.zoom='70%'");
    OpenBrowser = await driver.get(GlobalWMS.URL2);
    PopUp_Auth = await driver.get(GlobalWMS.PopupAuth); //Pop Up Authentication
    const loginElement = await driver.findElement(
      By.xpath(
        '//div[@class="mb-5 text-center text-3xl font-semibold text-neutral-700 md:text-left md:text-4xl"][text()="Login"]'
      )
    );
    wait_Element = await driver.wait(until.elementIsVisible(loginElement)); // Tunggu hingga elemen tersebut terlihat
    const isVisible = await loginElement.isDisplayed(); // Verifikasi apakah elemen tersebut terlihat
    console.log("Login Text berhasil ditemukan", isVisible);
    //Assert Style
    assert.strictEqual(isVisible, true, "Text Login Ditemukan");

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
      By.xpath(
        '//button[@class="flex w-full items-center justify-center gap-2 rounded-lg bg-red-400 p-3"][@aria-label="Production"]'
      )
    );
    btn_prod.click();
    await driver.sleep(500);
    let title = await driver.findElement(
      By.xpath('//h1[@class="text-2xl font-semibold"][text()="List FDX"]')
    );
    await driver.wait(until.elementIsEnabled(title));
    const isDisplayed = await title.isDisplayed(); //periksa apakah elemen ditampilkan dan aktif
    const isEnabled = await title.isEnabled();
    //assertion dengan chai expect BDD Style
    expect(isDisplayed).to.be.true;
    expect(isEnabled).to.be.true;
    console.log("Element berhasil dicari", isEnabled);
    await driver.sleep(1000);
  });
});
