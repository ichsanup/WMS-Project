const { By, until } = require("selenium-webdriver");
const GlobalWMS = require("./GlobalWMS");

async function regist(driver) {
  await driver.get(GlobalWMS.URL4);
  await driver.get(GlobalWMS.PopupAuth2);

  // let btnGetstarted = await driver.findElement(By.xpath(GlobalWMS.getStarted));
  // await btnGetstarted.click();
  // await driver.sleep(500);
  let btnGetstarted = await driver.wait(
    until.elementLocated(By.xpath(GlobalWMS.getStarted)),
    2000
  );
  await driver.wait(until.elementIsVisible(btnGetstarted), 1500);
  await btnGetstarted.click();
  await driver.sleep(500);

  let textbtnRegist = await driver.findElement(
    By.xpath(GlobalWMS.btnRegistNow)
  );
  await textbtnRegist.click();
  await driver.sleep(500);

  let joinTalent = await driver.findElement(By.xpath(GlobalWMS.btnJointTalent));
  await joinTalent.click();
  await driver.sleep(500);

  let btnRegist = await driver.findElement(By.xpath(GlobalWMS.btnRegisterNow));
  await btnRegist.click();
  await driver.sleep(500);
}

module.exports = { regist };
