const { By, until } = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
const assert = require("chai").assert;
const GlobalWMS = require("../GlobalWMS");

module.exports = async function callTclogin(driver) {
  console.log("🔵 Running Test Login...");
  const loginElement = await driver.findElement(
    By.xpath(
      '//div[@class="mb-5 text-center text-3xl font-semibold text-neutral-700 md:text-left md:text-4xl"][text()="Login"]'
    )
  );
  await driver.wait(until.elementIsVisible(loginElement));
  const isVisible = await loginElement.isDisplayed();
  assert.strictEqual(isVisible, true, "✅ Text Login Ditemukan");
  let emailField = await driver.findElement(By.id("emailInput"));
  await emailField.sendKeys(GlobalWMS.Email_Login);
  let passwordField = await driver.findElement(By.id("passwordInput"));
  await passwordField.sendKeys(GlobalWMS.Password_Login);
  let btnLogin = await driver.findElement(
    By.xpath(
      "//*[@class='w-full rounded-lg bg-red-500 p-3 font-bold text-white hover:bg-red-600']"
    )
  );
  await btnLogin.click();
  await driver.sleep(2500);
  let title = await driver.findElement(
    By.xpath(
      '//a[@class="my-auto self-stretch transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"][text()="Home"]'
    )
  );
  await driver.wait(until.elementIsEnabled(title));
  const isDisplayed = await title.isDisplayed();
  const isEnabled = await title.isEnabled();
  expect(isDisplayed).to.be.true;
  expect(isEnabled).to.be.true;
  console.log("✅ Login berhasil!");
};
