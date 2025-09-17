const URL_ORANGE =
  "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
const { Builder, By, Key, until } = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
require("dotenv").config();

describe("Heroku App Test", function () {
  let driver;
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    await driver.get(URL_ORANGE);
    await driver.sleep(2000);
  });

  it("Login Admin User", async function () {
    const username = await driver.findElement(
      By.xpath("//input[@placeholder='Username']")
    );
    await driver.wait(until.elementIsVisible(username), 1000);
    await username.sendKeys(process.env.USERNAME_ORANGE);
    const password = await driver.findElement(
      By.xpath('//input[@placeholder="Password"]')
    );
    await password.sendKeys(process.env.PASSWORD_ORANGE);
    const btn_login = await driver.findElement(
      By.xpath(
        '//button[@class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]'
      )
    );
    await btn_login.click();
    await driver.sleep(2500);
    const dashboard = await driver.findElement(
      By.xpath(
        '//h6[@class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]'
      )
    );
    await driver.wait(until.elementIsVisible(dashboard), 2000);
    expect(await dashboard.getText()).to.equal("Dashboard");
  });
  after(async function () {
    await driver.quit();
  });

  it("Login Logout", async function () {
    const username = await driver.findElement(
      By.xpath("//input[@placeholder='Username']")
    );
    await driver.wait(until.elementIsVisible(username), 1000);
    await username.sendKeys(process.env.USERNAME_ORANGE);
    const password = await driver.findElement(
      By.xpath('//input[@placeholder="Password"]')
    );
    await password.sendKeys(process.env.PASSWORD_ORANGE);
    const btn_login = await driver.findElement(
      By.xpath(
        '//button[@class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]'
      )
    );
    await btn_login.click();
    await driver.sleep(2500);
    const dashboard = await driver.findElement(
      By.xpath(
        '//h6[@class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]'
      )
    );
    await driver.wait(until.elementIsVisible(dashboard), 2000);
    expect(await dashboard.getText()).to.equal("Dashboard");
    const burger_menu = await driver.findElement(
      '//i[@class="oxd-icon bi-caret-down-fill oxd-userdropdown-icon"]'
    );
    await burger_menu.click();
    await driver.sleep(1000);
    const btn_logout = await driver.findElement(
      By.xpath('//a[@class="oxd-userdropdown-link" and text()="Logout"]')
    );
    await driver.wait(until.elementIsVisible(btn_logout), 2000);
    await btn_logout.click();
    await driver.sleep(2000);
  });

  it("Delete Admin User Positive", async function () {
    const username = await driver.findElement(
      By.xpath("//input[@placeholder='Username']")
    );
    await driver.wait(until.elementIsVisible(username), 1000);
    await username.sendKeys(process.env.USERNAME_ORANGE);
    const password = await driver.findElement(
      By.xpath('//input[@placeholder="Password"]')
    );
    await password.sendKeys(process.env.PASSWORD_ORANGE);
    const btn_login = await driver.findElement(
      By.xpath(
        '//button[@class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]'
      )
    );
    await btn_login.click();
    await driver.sleep(2500);
    const Admin = await driver.findElement(
      By.xpath(
        '(//span[@class="oxd-text oxd-text--span oxd-main-menu-item--name" and text()="Admin"])[2]'
      )
    );
    await Admin.click();
    await driver.sleep(2000);
    await driver.actions().sendKeys(Key.PAGE_DOWN).perform();
    for (let i = 0; i < 2; i++) {
      const btn_trash_list = await driver.findElement(
        By.xpath(
          '(//button[@class="oxd-icon-button oxd-table-cell-action-space"]//i[@class="oxd-icon bi-trash"])'
        )
      );
      if (btn_trash_list.length === 0) {
        console.log("Data sudah habis");
        break;
      }
      const btn_trash = btn_trash_list[0];
      await driver.wait(until.elementIsVisible(btn_trash), 2000);
      await btn_trash.click();
      await driver.sleep(1500); // Wait for modal to appear

      const btn_delete = await driver.findElement(
        By.xpath(
          '//button[@class="oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin"]'
        )
      );
      await driver.wait(until.elementIsVisible(btn_delete), 2000);
      await btn_delete.click();
      await driver.sleep(1500); // Wait for deletion to complete
      expect(btn_trash).to.exist;
      console.log("Data berhasil dihapus");
    }
  });
  after(async function () {
    await driver.quit();
  });

  it("Delete Admin User Negative", async function () {
    const username = await driver.findElement(
      By.xpath("//input[@placeholder='Username']")
    );
    await driver.wait(until.elementIsVisible(username), 1000);
    await username.sendKeys(process.env.USERNAME_ORANGE);
    const password = await driver.findElement(
      By.xpath('//input[@placeholder="Password"]')
    );
    await password.sendKeys(process.env.PASSWORD_ORANGE);
    const btn_login = await driver.findElement(
      By.xpath(
        '//button[@class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]'
      )
    );
    await btn_login.click();
    await driver.sleep(2500);
    const Admin = await driver.findElement(
      By.xpath(
        '//span[@class="oxd-text oxd-text--span oxd-main-menu-item--name" and text()="Admin"]'
      )
    );
    await Admin.click();
    await driver.sleep(2000);
    await driver.actions().sendKeys(Key.PAGE_DOWN).perform();
    for (let i = 0; i < 2; i++) {
      const btn_trash_list = await driver.findElement(
        By.xpath(
          '(//button[@class="oxd-icon-button oxd-table-cell-action-space"]//i[@class="oxd-icon bi-trash"])'
        )
      );
      if (btn_trash_list.length === 0) {
        console.log("Data sudah habis");
        break;
      }
      const btn_trash = btn_trash_list[0];
      await driver.wait(until.elementIsVisible(btn_trash), 2000);
      await btn_trash.click();
      await driver.sleep(1500); // Wait for modal to appear

      const btn_delete = await driver.findElement(
        By.xpath(
          '//button[@class="oxd-button oxd-button--medium oxd-button--label-danger orangehrm-button-margin"]'
        )
      );
      await driver.wait(until.elementIsVisible(btn_delete), 2000);
      await btn_delete.click();
      await driver.sleep(1500); // Wait for deletion to complete
      expect(btn_trash).to.exist;
      console.log("Data berhasil dihapus");
    }
  });
  after(async function () {
    await driver.quit();
  });
});
