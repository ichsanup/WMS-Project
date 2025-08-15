const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { regist } = require("../RegistHelper");
const { Key } = require("selenium-webdriver");

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
    console.error("Gagal menyimpan screenshot:", error);
  }
}

function generateRandomEmail() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let randomText = "";

  for (let i = 0; i < 8; i++) {
    randomText += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${randomText}@gmail.com`;
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
    // await driver.executeScript("document.body.style.zoom='65%'");
    //Webdriverwait in mocha
    const waitinputName = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//input[@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "][@name="name"][@placeholder="Enter your name"]'
        )
      ),
      1000
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
    let email = await driver.findElement(
      By.xpath(
        '//input[@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "][@name="email"]'
      ),
      1000
    );
    await email.sendKeys(emailRandom);
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
    try {
      driver.sleep(1000);
      let btnChecklist = await driver.findElement(
        By.xpath(
          '(//label[@class="flex items-center gap-2"]//input[@name="agency_interest" and @type="checkbox"])[1]'
        )
      );
      await driver.executeScript(
        "arguments[0].scrollIntoView(true);",
        btnChecklist
      );
      await btnChecklist.click();
      await driver.sleep(1000);
      const linkTiktok = await driver.findElement(
        By.xpath('//input[@name="tiktok_link"]')
      );
      await linkTiktok.sendKeys("https://vt.tiktok.com/ZSrBbGEX6/");
      let btnRegist = await driver.findElement(
        By.xpath(
          '//button[@class="w-full rounded-lg bg-red-500 py-3 font-bold text-white hover:bg-red-600 disabled:bg-red-300" and text()="Register Now"]'
        ),
        1000
      );
      await driver.wait(until.elementIsVisible(btnRegist), 1000);
      await btnRegist.click();
      console.log("Button Regist Berhasil Diklik");
      await driver.sleep(1500);
    } catch (error) {
      console.log("URL tidak sesuai", error.message);
    }
    await driver.sleep(1000);
    const changeEmail = await driver.findElement(
      By.xpath(
        '//button[@class="border-b-2 border-b-[#E8655B] text-lg font-bold text-[#E8655B]"][text()="Change email"]'
      )
    );
    changeEmail.click();
    await driver.sleep(1500);
    const newEmail = await driver.findElement(
      By.xpath(
        '//input[@name="email"][@class="w-full rounded-md border px-3 py-2 border-gray-300 bg-white "]'
      )
    );
    async function clearAndType(element, value) {
      await element.clear();
      await element.sendKeys(value);
    }
    await clearAndType(newEmail, GlobalWMS.Email_Random);
    await driver.sleep(2000);
    try {
      const btnChangeEmail = await driver.findElement(
        By.xpath(
          '//button[@class="w-full rounded-lg bg-red-500 py-3 font-bold text-white hover:bg-red-600 disabled:bg-red-300"][text()="Change email"]'
        )
      );
      await driver.wait(until.elementIsVisible(btnChangeEmail), 1000);
      await btnChangeEmail.click();
      console.log("Button Change Email Berhasil Diklik");
    } catch (error) {
      console.error("Gagal mengklik tombol Change Email:", error.message);
      await takeScreenshot(driver, "ChangeEmailError");
    }
    await driver.sleep(3500);
    // let currentURL = await driver.getCurrentUrl();
    // expect(currentURL).to.include(
    //   "https://admin:68BHr63vBpH2G7jh@syuting.film/register/talent/verify"
    // );
    // await driver.sleep(2000);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
