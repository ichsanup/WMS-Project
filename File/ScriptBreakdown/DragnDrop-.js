const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chai = require("chai");
const expect = chai.expect;
const GlobalWMS = require("../GlobalWMS");
require("../GlobalVisitIpad");

describe("Script Breakdown", function () {
  it("Drag & Drop Scene in Script Breakdown", async function () {
    this.timeout(20000);
    await driver.executeScript("document.body.style.zoom='50%'");
    // Fungsi drag & drop pakai JavaScript injection
    async function simulateDragDrop(driver, sourceElem, targetElem) {
      const script = `
        function simulateDragDrop(sourceNode, destinationNode) {
          const EVENT_TYPES = {
            DRAG_END: 'dragend',
            DRAG_START: 'dragstart',
            DROP: 'drop'
          };
    
          function createCustomEvent(type) {
            const event = new CustomEvent("CustomEvent");
            event.initCustomEvent(type, true, true, null);
            event.dataTransfer = {
              data: {},
              setData: function(key, value) {
                this.data[key] = value;
              },
              getData: function(key) {
                return this.data[key];
              }
            };
            return event;
          }
    
          function dispatchEvent(node, type, event) {
            if (node.dispatchEvent) {
              return node.dispatchEvent(event);
            }
            if (node.fireEvent) {
              return node.fireEvent("on" + type, event);
            }
          }
    
          const dragStartEvent = createCustomEvent(EVENT_TYPES.DRAG_START);
          dispatchEvent(sourceNode, EVENT_TYPES.DRAG_START, dragStartEvent);
    
          const dropEvent = createCustomEvent(EVENT_TYPES.DROP);
          dropEvent.dataTransfer = dragStartEvent.dataTransfer;
          dispatchEvent(destinationNode, EVENT_TYPES.DROP, dropEvent);
    
          const dragEndEvent = createCustomEvent(EVENT_TYPES.DRAG_END);
          dragEndEvent.dataTransfer = dragStartEvent.dataTransfer;
          dispatchEvent(sourceNode, EVENT_TYPES.DRAG_END, dragEndEvent);
        }
    
        simulateDragDrop(arguments[0], arguments[1]);
      `;
      await driver.executeScript(script, sourceElem, targetElem);
    }

    // Login
    await driver.get(GlobalWMS.URL);
    await driver.get(GlobalWMS.PopupAuth);

    let emailField = await driver.findElement(By.id("emailInput"));
    await emailField.sendKeys(GlobalWMS.Email_CS1);
    let passwordField = await driver.findElement(By.id("passwordInput"));
    await passwordField.sendKeys(GlobalWMS.Password_CS);
    let btnLogin = await driver.findElement(
      By.xpath(
        '//*[@class="w-full rounded-lg bg-red-500 p-3 font-bold text-white hover:bg-red-600"]'
      )
    );
    btnLogin.click();
    await driver.sleep(1500);

    // Menuju halaman Script Breakdown
    await driver.get(GlobalWMS.URL3);
    await driver.wait(until.urlContains("/ph/script-breakdown"), 5000);
    const currentURL = await driver.getCurrentUrl();
    expect(currentURL).to.equal(GlobalWMS.URL3);
    await driver.sleep(500);
    //Zoom out
    await driver.executeScript("document.body.style.zoom='50%'");
    // Klik Lihat Script
    const chooseFile = await driver.findElement(
      By.xpath(
        '//h3[contains(text(), "DragDrop.fdx")]/ancestor::div[contains(@class, "mb-2")]/following-sibling::div//span[text()="Lihat script"]'
      )
    );
    chooseFile.click();
    await driver.sleep(500);

    // Klik Tambah ND
    // const btnAddND = await driver.findElement(
    //   By.className(
    //     "flex min-h-[43px] min-w-[186px] items-center gap-2 rounded-lg bg-[#F97066] px-8 py-2 font-semibold text-white"
    //   )
    // );
    // btnAddND.click();
    // await driver.sleep(500);

    // Buka dan pilih tanggal
    // const clickDate = await driver.findElement(
    //   By.xpath(
    //     '//div[@class="date-picker-container flex min-h-[72px] w-full items-center justify-center rounded-t-lg border border-[#42C1E3] bg-[#ECF9FC] px-9 py-2 border-dashed"]'
    //   )
    // );
    // await driver.wait(until.elementIsVisible(clickDate), 5000);
    // await driver.actions({ bridge: true }).doubleClick(clickDate).perform();
    // await driver.sleep(500);

    // const selectDate = await driver.findElement(
    //   By.xpath(
    //     '//div[@class="flex h-8 select-none items-center justify-center rounded-full font-publicSans text-sm font-normal cursor-pointer hover:bg-gray-100"]'
    //   )
    // );
    // await driver.wait(until.elementIsVisible(selectDate), 5000);
    // selectDate.click();
    await driver.sleep(1500);

    // Drag & drop scene ke tanggal
    const scene = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//div[@class="flex min-h-[70px] w-full items-center justify-between gap-[60px] px-9 py-[6px] border border-[#74D2E8] cursor-move"]'
        )
      ),
      5000
    );

    const dateSlot = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//div[@class="date-picker-container flex min-h-[72px] w-full items-center justify-center rounded-t-lg border border-[#42C1E3] bg-[#ECF9FC] px-9 py-2"]//span[@class="block font-semibold text-[#434343]"]'
        )
      ),
      5000
    );
    await driver.executeScript("arguments[0].scrollIntoView(true);", scene);
    await driver.executeScript("arguments[0].scrollIntoView(true);", dateSlot);

    console.log("Scene and DateSlot ready, starting drag-drop...");

    // Gunakan drag and drop JS
    await simulateDragDrop(driver, scene, dateSlot);
    await driver.sleep(1500);
  });
});
