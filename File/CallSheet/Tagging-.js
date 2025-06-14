const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome"); //import chrome options
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
const { login } = require("../LoginHelper");

describe("View Call Sheet", function () {
  let driver;
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver);
  });

  it("WMS Website", async function () {
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.CallSheet));
    chooseFile.click();
    await driver.sleep(500);
    const DateShow = await driver.findElement(
      By.xpath(
        '//div[@class="flex flex-1 items-center justify-center rounded-md px-4 py-2"]'
      )
    );
    //Create condition "if" with try and catch
    if (DateShow.length === 0) {
      const btnAddND = await driver.findElement(
        By.className(
          "flex min-h-[43px] min-w-[186px] items-center gap-2 rounded-lg bg-[#F97066] px-8 py-2 font-semibold text-white"
        )
      );
      btnAddND.click();
      await driver.sleep(500);
      const clickDate = await driver.findElement(
        By.xpath(
          '//div[@class="date-picker-container flex min-h-[72px] w-full items-center justify-center rounded-t-lg border border-[#42C1E3] bg-[#ECF9FC] px-9 py-2 border-dashed"]'
        )
      );
      await driver.wait(until.elementIsVisible(clickDate), 1000);
      await driver.actions({ bridge: true }).doubleClick(clickDate).perform();
      await driver.sleep(500);
      const selectDate = await driver.findElement(
        By.xpath(
          '//div[@class="flex h-8 select-none items-center justify-center rounded-full font-publicSans text-sm font-normal cursor-pointer hover:bg-gray-100"]'
        )
      );
      await driver.wait(until.elementIsVisible(selectDate), 1000);
      selectDate.click();
      await driver.sleep(500);
    } else {
      console.log("DateShow is already present, no need to add");
      let textbtn_CS = await driver.findElement(
        By.xpath(
          '//button[@class="flex items-center gap-1 rounded-md px-3 py-1.5 text-[#E8655B]"]'
        )
      );
      textbtn_CS.click();
      await driver.sleep(500);
      let isEnabledCS = await driver.findElement(
        By.xpath(
          '//h1[@class="font-inter text-xl font-bold leading-7 tracking-[0.15px]"]'
        )
      );
      const CallSheet = await isEnabledCS.isEnabled();
      expect(CallSheet).to.be.true;
      console.log("Berhasil masuk ke Call Sheet", CallSheet);
    }
    await driver.sleep(1500);
    //scroll page
    await driver.executeScript("window.scrollBy(0,900);");
    //Holding Data n Tagg
    const element = await driver.findElement(
      By.xpath(
        '//div[@class="min-h-[184px] overflow-wrap-break-word w-full whitespace-normal break-words rounded-md border border-transparent p-2 text-[9px] hover:border-gray-200"]//span[@class="text-[9px]"][text()="Test"]'
      )
    );
    const rect = await element.getRect();
    await driver
      .actions({ bridge: true })
      .move({ origin: element, x: 0, y: 1 }) // Move to start of text
      .press() // Mouse down
      .move({ origin: element, x: rect.width - 100, y: 2 }) // Drag across text
      .release() // Mouse up
      .perform();
    await driver.sleep(1500);
    //Holding text
    await driver
      .actions({ bridge: true })
      .move({ origin: element }) // Move to the element
      .press() // Press and hold (mouse down)
      .pause(1500) // Hold for second (1000 ms)
      .release() // Release the click
      .perform(); // Execute the action sequence

    // Optionally wait for popup to appear
    const popup = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//button[@class="px-3 text-left text-sm font-medium text-[#2D2D2D] hover:bg-[#E85A4F] hover:text-white active:bg-[#E85A4F] active:text-white"][text()="Tambah Cast"]'
        )
      ),
      1000
    );
    console.log(await popup.getText());
    popup.click();
  });
  after(async function () {
    if (driver) {
      await driver.quit(); // pastikan browser ditutup setelah test selesai
    }
  });
});

// await driver.sleep(500);
//     const umur = await driver.findElement(
//       By.xpath(
//         '//div[@class="flex h-16 w-full flex-col gap-[6px] text-[#434343]"]//input[@id="age"]'
//       )
//     );
//     umur.sendKeys(GlobalWMS.Data_ID);
//     const JK = await driver.findElement(
//       By.xpath('//div[@class="flex items-center gap-2"]//input[@id="male"]')
//     );
//     JK.click();
//     const TextArea = await driver.findElement(
//       By.xpath(
//         '//textarea[@class="min-h-16 rounded-lg border border-[#0000001A] bg-white px-3 py-2 text-[#434343] focus:outline-[#E8655B]"]'
//       )
//     );
//     TextArea.sendKeys("Test");
//     const btnTambahBrief = await driver.findElement(
//       By.xpath(
//         '//button[@class="flex min-w-[120px] items-center justify-center rounded-md bg-[#f97066] px-4 py-2 text-white transition-colors hover:bg-[#e05d53] disabled:cursor-not-allowed disabled:opacity-50"]'
//       )
//     );
//     btnTambahBrief.click();
//     await driver.sleep(500);
//   });
