const { BUilder, By, until, Actions, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const { login } = require("../LoginHelper");
const GlobalWMS = require("../GlobalWMS");

describe("Add media at Briefing", function () {
  let driver;

  before(async function () {
    let options = new chrome.Options();
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("Add Media Audio and Image/Video", async function () {
    await driver.executeScript("document.body.style.zoom='75%'");
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Sample));
    chooseFile.click();
    await driver.sleep(500);
    const menuBriefing = await driver.findElement(
      By.xpath(
        '//a[@class="relative px-[11px] py-[5px] text-sm font-medium text-gray-600 hover:text-gray-900"][text()="Briefing"]'
      )
    );
    menuBriefing.click();
    await driver.sleep(500);
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU0LCJuYW1lIjoic2FuIiwiZW1haWwiOiJzYW5Ad29uZ21ha211ci5jb20iLCJyb2xlX2lkIjo0LCJwcm9kdWN0aW9uX2hvdXNlIjp7ImlkIjoxMCwibmFtZSI6IkFydW5pa2EgU3R1ZGlvIiwiaXNfb25ib2FyZGVkIjp0cnVlfSwiaWF0IjoxNzQ3NjM2NTgyLCJleHAiOjE3NTAyMjg1ODJ9.-cpkSJ5zgIkIF1wy4EFeNPaLvS7RCr1jfbYH3HJwTog"; // isi token kamu lengkap di sini
    async function updateBriefingByName(targetName) {
      try {
        const listResponse = await fetch(
          "https://api-shooting-710933064092.asia-southeast2.run.app/briefings/elements",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const response = await listResponse.json();
        const elements = response.data?.elements;

        if (!Array.isArray(elements)) {
          console.error("Data 'elements' tidak ditemukan:", response);
          return;
        }

        const target = elements.find((item) => item.name === targetName);

        if (!target) {
          console.error("Data dengan nama tidak ditemukan:", targetName);
          return;
        }

        const id = target.id;
        console.log("ID ditemukan:", id);

        const updateResponse = await fetch(
          `https://api-shooting-710933064092.asia-southeast2.run.app/briefings/elements/${id}`,
          {
            method: "PUT",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: "Briefing Baru dari Otomasi",
              description: "Ini hasil automate menggunakan ID langsung",
              media_url: "",
            }),
          }
        );

        const result = await updateResponse.text();
        console.log("Response:", result);

        if (!updateResponse.ok) {
          throw new Error(`Gagal update. Status: ${updateResponse.status}`);
        }
      } catch (err) {
        console.error("Terjadi error:", err);
      }
    }

    updateBriefingByName("Test Tiga"); // contoh penggunaan
  });
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
