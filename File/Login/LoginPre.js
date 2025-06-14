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
    OpenBrowser = await driver.get(GlobalWMS.URL_Stagging);
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
    let btn_Pre = await driver.findElement(
      By.xpath(
        '//button[@class="flex w-full items-center justify-center gap-2 rounded-lg bg-red-400 p-3"][@aria-label="Pre-Production"]'
      )
    );
    btn_Pre.click();
    await driver.sleep(500);
    let title = await driver.findElement(
      By.xpath(
        '//a[@class="my-auto self-stretch transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"][text()="Home"]'
      )
    );
    await driver.wait(until.elementIsEnabled(title));
    const isDisplayed = await title.isDisplayed(); //periksa apakah elemen ditampilkan dan aktif
    const isEnabled = await title.isEnabled();
    //assertion dengan chai expect BDD Style
    expect(isDisplayed).to.be.true;
    expect(isEnabled).to.be.true;
    try {
      await driver.executeScript("window.scrollBy(0,500);"); //scroll ke element tertentu
      let Next = await driver.findElement(By.xpath(GlobalWMS.Skip));
      // await driver.executeScript("arguments[0].scrollIntoView(true)", element);
      await driver.wait(until.elementIsVisible(Next), 1000);
      await Next.click();
      await driver.sleep(1000);
    } catch (err) {
      console.log("Element Next tidak ditemukan langsung ke Homepage");
    }
    const HomePage = await driver.findElement(
      By.xpath(
        '//a[@class="my-auto self-stretch transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"][text()="Home"]'
      )
    );
    await HomePage.click();
    await driver.sleep(2000);
    // let submit = await driver.findElement(
    //   By.xpath(
    //     '//button[@class="my-auto gap-2.5 self-stretch whitespace-nowrap rounded-lg bg-red-400 px-6 py-2.5 text-center text-sm font-bold text-white transition-colors duration-200 hover:bg-red-500 max-md:px-5"][text()="Submit"]'
    //   )
    // );
    // await driver.executeScript("arguments[0].scrollIntoView(true)", submit);
    // await driver.sleep(1000);
    // let isVisibleSubmit = await submit.isDisplayed();
    // console.log("Element berhasil dicari", isVisibleSubmit);
    // expect(isVisibleSubmit).to.be.true;
  });
});
