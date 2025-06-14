const { By, until } = require("selenium-webdriver");
const GlobalWMS = require("./GlobalWMS");

async function regist(driver) {
  await driver.get(GlobalWMS.URL2);
  await driver.get(GlobalWMS.PopupAuth);

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
