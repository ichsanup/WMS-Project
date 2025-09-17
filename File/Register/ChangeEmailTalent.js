const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { regist } = require("../RegistHelper");
const fs = require("fs");

async function takeScreenshot(driver, testName) {
  const screenshotDir = "./screenshots"; // Folder penyimpanan screenshot
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const screenshotPath = `${screenshotDir}/${testName}-${timestamp}.png`;

  try {
    const image = await driver.takeScreenshot();
    fs.writeFileSync(screenshotPath, image, "base64");
    console.log(`Screenshot saved: ${screenshotPath}`);
  } catch (error) {
    console.error("Failed to save screenshot:", error);
  }
}

function generateRandomEmail() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let randomText = Array.from({ length: 8 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");

  return `${randomText}@gmail.com`;
}

async function fillInput(driver, xpath, value, timeout = 1000) {
  const input = await driver.wait(
    until.elementLocated(By.xpath(xpath)),
    timeout
  );
  await driver.wait(until.elementIsVisible(input), timeout);
  await input.clear();
  await input.sendKeys(value);
}

describe("WMS Regist Test", function () {
  let driver;
  let emailRandom = generateRandomEmail();

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await regist(driver);
  });

  it("WMS Regist", async function () {
    try {
      await fillInput(
        driver,
        '//input[@name="name" and @placeholder="Enter your name"]',
        GlobalWMS.Data_Name
      );
      await fillInput(driver, '//input[@name="id_number"]', GlobalWMS.Data_ID);
      await fillInput(driver, '//input[@name="email"]', emailRandom);
      await fillInput(
        driver,
        '//input[@name="password"]',
        GlobalWMS.Data_Password
      );
      await fillInput(
        driver,
        '//input[@name="confirmPassword"]',
        GlobalWMS.Data_Password
      );

      // Checklist agency_interest
      const btnChecklist = await driver.findElement(
        By.xpath(
          '(//label[@class="flex items-center gap-2"]//input[@name="agency_interest" and @type="checkbox"])[1]'
        )
      );
      await driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        btnChecklist
      );
      await btnChecklist.click();

      // Fill TikTok link
      await fillInput(
        driver,
        '//input[@name="tiktok_link"]',
        "https://vt.tiktok.com/ZSrBbGEX6/"
      );

      // Click Register Now
      const btnRegist = await driver.wait(
        until.elementLocated(
          By.xpath(
            '//button[text()="Register Now" and contains(@class,"bg-red-500")]'
          )
        ),
        1000
      );
      await driver.wait(until.elementIsVisible(btnRegist), 1000);
      await btnRegist.click();
      console.log("Button Regist clicked");
      await driver.sleep(2500);

      // Change Email
      const changeEmailBtn = await driver.wait(
        until.elementLocated(
          By.xpath(
            '//button[text()="Change email" and contains(@class,"border-b-2")]'
          )
        ),
        1000
      );
      await changeEmailBtn.click();

      await fillInput(driver, '//input[@name="email"]', GlobalWMS.Email_Random);
      await driver.actions().sendKeys(Key.PAGE_UP).perform();

      // Click Change Email
      const btnChangeEmail = await driver.wait(
        until.elementLocated(
          By.xpath(
            '//button[text()="Change email" and contains(@class,"bg-red-500")]'
          )
        ),
        1000
      );
      await driver.wait(until.elementIsVisible(btnChangeEmail), 1500);
      await btnChangeEmail.click();
      console.log("Button Change Email clicked");
    } catch (error) {
      console.error("Test failed:", error.message);
      await takeScreenshot(driver, "ChangeEmailError");
    }
    await driver.sleep(2500);
  });

  after(async function () {
    if (driver) await driver.quit();
  });
});
