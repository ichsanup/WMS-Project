const { Builder, By, until, actions } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { loginpre } = require("../LoginPre");
const { Key } = require("selenium-webdriver");

describe("Rate Price of Talent", async function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await loginpre(driver);
  });

  it("Filter by Price for Talent", async function () {
    await driver.executeScript("document.body.style.zoom='65%'");
    const rate = await driver.findElement(
      By.xpath(
        '(//button[@class="my-auto flex items-center gap-2 self-stretch rounded-lg border border-solid bg-white px-4 py-3 border-neutral-700 text-neutral-700 opacity-60"])[2]'
      )
    );
    await rate.click();
    const sliderTrack = await driver.findElement(
      By.xpath(
        '//div[contains(@class, "relative") and contains(@class, "touch-none")]'
      )
    );

    // Ambil handle (yang akan digeser)
    const handle = await driver.findElement(
      By.xpath(
        '(//div[contains(@class, "cursor-grab") and contains(@class, "bg-red-400")])[1]'
      )
    );

    // Ambil posisi & ukuran slider track
    const rect = await driver.executeScript(
      `
    const box = arguments[0].getBoundingClientRect();
    return { x: box.x, y: box.y, width: box.width, height: box.height };
  `,
      sliderTrack
    );

    // Target ke 20% (0.2)
    const targetPercent = 0.1;
    const targetX = Math.floor(rect.x + rect.width * targetPercent);
    const centerY = Math.floor(rect.y + rect.height / 2);

    // Simulasikan drag pakai koordinat absolut
    const actions = driver.actions({ async: true });
    await actions
      .move({ x: targetX, y: centerY }) // ke posisi target
      .press()
      .move({ x: targetX + 1, y: centerY }) // sedikit geser untuk pastikan gerakan
      .release()
      .perform();
    await driver.sleep(1000);
    const btnApply = await driver.findElement(
      By.xpath(
        '//button[@class="min-w-[178px] self-stretch rounded-lg border border-solid bg-[#E8655B] p-3"]'
      )
    );
    await btnApply.click();
    await driver.sleep(1500);
    await driver.executeScript("window.scrollBy(0,350)");
    await driver.sleep(1500);
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
