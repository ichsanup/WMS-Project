const { By, until } = require("selenium-webdriver");
const GlobalWMS = require("./GlobalWMS");

async function login(driver) {
  await driver.get(GlobalWMS.URL2);
  await driver.get(GlobalWMS.PopupAuth);
  await driver.sleep(2000);

  let btnGetstarted = await driver.findElement(By.xpath(GlobalWMS.getStarted));
  await btnGetstarted.click();
  await driver.sleep(500);

  let emailField = await driver.findElement(By.id("emailInput"));
  await emailField.sendKeys(GlobalWMS.Email_CS2);

  let passwordField = await driver.findElement(By.id("passwordInput"));
  await passwordField.sendKeys(GlobalWMS.Password_CS);

  let btnLogin = await driver.findElement(By.xpath(GlobalWMS.btn_Login));
  await btnLogin.click();
  await driver.sleep(1500);

  let btn_prod = await driver.findElement(By.xpath(GlobalWMS.Login_Prod));
  await driver.sleep(1000);
  await btn_prod.click();
  await driver.sleep(1000);
}

module.exports = { login };
