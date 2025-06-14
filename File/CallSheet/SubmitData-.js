const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const { login } = require("../LoginHelper"); // ← import helper login
const GlobalWMS = require("../GlobalWMS");

describe("View Call Sheet", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await login(driver); // ← panggil login sebelum test
  });

  it("WMS Website", async function () {
    await driver.executeScript("document.body.style.zoom='65%'"); //zoom out page
    const chooseFile = await driver.findElement(By.xpath(GlobalWMS.Sample));
    await chooseFile.click();
    await driver.sleep(2500);
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
      await driver.sleep(2500);
      let isEnabledCS = await driver.findElement(
        By.xpath(
          '//h1[@class="font-inter text-xl font-bold leading-7 tracking-[0.15px]"]'
        )
      );
      const CallSheet = await isEnabledCS.isEnabled();
      expect(CallSheet).to.be.true;
      console.log("Berhasil masuk ke Call Sheet", CallSheet);
    }
    await driver.sleep(1000);
    const btn_time = await driver.findElement(
      By.xpath(
        '//div[@class="flex items-center justify-center"]//div[@class="relative"]//button[@class="flex items-center justify-between rounded-lg text-[#434343] font-bold"]'
      )
    );
    btn_time.click();
    await driver.sleep(1000);
    const chooseTime = await driver.findElement(
      By.xpath(
        '//div[@class="flex items-center justify-center"]//div[@class="relative"]//button[text()=03]'
      )
    );
    await driver.wait(until.elementIsEnabled(chooseTime));
    const isDisplayed = await chooseTime.isDisplayed();
    const isEnabled = await chooseTime.isEnabled();
    expect(isDisplayed).to.be.true;
    expect(isEnabled).to.be.true;
    chooseTime.click();
    await driver.sleep(500);
    const btn_ok = await driver.findElement(
      By.xpath('//button[contains(text(), "OK")]')
    );
    const btnOKEnabled = await btn_ok.isEnabled();
    expect(btnOKEnabled).to.be.true;
    await btn_ok.click();
    console.log("Berhasil klik OK", btnOKEnabled);
    const addData = await driver.findElement(
      '//button[@class="mt-1 inline-flex items-center gap-1 self-center px-2 py-1 text-[#E8655B]"]//span[text()="add"]'
    );
    await driver.sleep(700);
    addData.click();
    const input_Data1 = await driver.findElement(
      '//div[@class="mx-3 flex items-center justify-center gap-[30px]"]//input[@class="h-[26px] w-[142px] rounded-lg p-2 text-[10px] font-normal leading-[20px] placeholder-[#D5D5D5] focus:outline-[#E5586B]"]'
    );
    input_Data1.click();
    input_Data1.sendKeys("Test");
    const input_Data2 = await driver.findElement(
      '//div[@class="flex items-center justify-center gap-[5px]"]//input[@class="h-[26px] w-[82px] rounded-lg p-2 text-[10px] font-normal leading-[20px] placeholder-[#D5D5D5] focus:outline-[#E5586B]"]'
    );
    input_Data2.click();
    input_Data2.sendKeys("0838xxxxxxxxx");
    const addData2 = await driver.findElement(
      By.xpath(
        '//button[@class="mt-1 inline-flex h-[36px] w-[96px] items-center gap-1 self-center px-2 py-1 text-[#E8655B]"]//span[text()="add"]'
      )
    );
    addData2.click();
    const input_Data3 = await driver.findElement(
      By.xpath(
        '//div[@class="flex min-h-[300px] flex-col justify-between border border-[#A6E3ED]"]//input[@class="h-[26px] w-[142px] rounded-lg p-2 text-[10px] font-normal leading-[20px] placeholder-[#D5D5D5] focus:outline-[#E5586B]"]'
      )
    );
    input_Data3.sendKeys("Tester");
    const input_Data4 = await driver.findElement(
      By.xpath(
        '//div[@class="flex min-h-[300px] flex-col justify-between border border-[#A6E3ED]"]//input[@class="h-[26px] w-[82px] rounded-lg p-2 text-[10px] font-normal leading-[20px] placeholder-[#D5D5D5] focus:outline-[#E5586B]"]'
      )
    );
    input_Data4.sendKeys("Tester");
    const location = await driver.findElement(
      By.xpath(
        '//div[@class="relative"]//span[@class="material-icons absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-[#D5D5D5]"][text()="search"]'
      )
    );
    location.click();
    const btn_saveLoc = await driver.findElement(
      By.xpath(
        '//button[@class="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground mt-[10px] h-[43px] w-full rounded-lg bg-[#E8655B] px-8 py-2 text-white"][text()="Save Location"]'
      )
    );
    btn_saveLoc.click();
    const btn_SaveCall = await driver.findElement(
      By.xpath(
        '//button[@class="inline-flex h-12 w-[280px] items-center justify-center rounded-lg bg-[#E8655B] px-2 py-1 text-white"]'
      )
    );
    btn_SaveCall.click();
    await driver.sleep(1000);
  });
  after(async function () {
    if (driver) {
      await driver.quit(); // pastikan browser ditutup setelah test selesai
    }
  });
});
