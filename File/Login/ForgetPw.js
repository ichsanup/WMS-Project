const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const GlobalWMS = require("../GlobalWMS");
const fs = require("fs");

// Fungsi untuk menyimpan screenshot jika gagal
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

function RandomEmail() {
  const Random_Email = Math.random()
    .toString(36)
    .substring(2, 12)
    .replace(/[0-9]/g, "");
  return `${Random_Email}@gmail.com`;
}

describe("Forgot Password", function () {
  let driver;

  before(async function () {
    let options = new chrome.Options();
    options.addArguments("--start-maximized");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    await driver.executeScript("document.body.style.zoom='60%'");
  });

  it("Test Forgot Password", async function () {
    try {
      Link = await driver.get(GlobalWMS.URL4);
      popUp = await driver.get(GlobalWMS.PopupAuth2);
      await driver.sleep(2000);
      let btnGetstarted = await driver.findElement(
        By.xpath(GlobalWMS.getStarted)
      );
      await btnGetstarted.click();
      await driver.sleep(500);
      let forgotpw = await driver.findElement(
        By.xpath(
          '//button[@class="border-b-2 border-black font-bold text-black"][text()="Forget Password"]'
        ),
        1000
      );
      await forgotpw.click();
      await driver.sleep(1000);

      let enterEmail = await driver.findElement(
        By.xpath('//input[@id="emailInput"][@placeholder="Enter your email"]')
      );
      await driver.wait(until.elementIsVisible(enterEmail), 1000);
      await driver.wait(until.elementIsEnabled(enterEmail), 1000);
      // await enterEmail.sendKeys(RandomEmail());
      await enterEmail.sendKeys("ichsanustaf@gmail.com");

      let btn_Resetpw = await driver.findElement(
        By.xpath(
          '//button[@class="w-full rounded-lg bg-red-500 p-3 text-xl font-bold text-white hover:bg-red-600"][text()="Reset Password"]'
        )
      );
      await driver.wait(until.elementIsVisible(btn_Resetpw), 1000);
      await driver.wait(until.elementIsEnabled(btn_Resetpw), 1000);
      await btn_Resetpw.click();
      console.log("Button Reset Password Berhasil di Klik");

      try {
        let successMsg = await driver.wait(
          until.elementLocated(
            By.xpath('//div[@class="mb-4 leading-6 text-neutral-400"]')
          ),
          1000
        );
        console.log(
          "Forgot Password berhasil dikirim:",
          await successMsg.getText()
        );
      } catch (error) {
        console.log("Forgot Password tidak berhasil dikirim");
        //Name of files is ForgotPassword-Failed
        await takeScreenshot(driver, "ForgotPassword-Failed");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      await takeScreenshot(driver, "ForgotPassword-Error");
      throw error; // Tetap melempar error agar test gagal
    }

    await driver.sleep(1000);
  });
  after(async function () {
    await driver.quit();
  });
});
