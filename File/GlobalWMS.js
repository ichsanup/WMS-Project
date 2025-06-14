const GlobalWMS = {
  URL: "https://qctest---frontend-shooting-a6e4wwojjq-et.a.run.app/",
  URL2: "https://staging---frontend-shooting-a6e4wwojjq-et.a.run.app/",
  URL3: "https://dev---frontend-shooting-a6e4wwojjq-et.a.run.app/",
  URL_Stagging:
    "https://staging---frontend-shooting-710933064092.asia-southeast2.run.app/",
  Email_Login: "ichsanup@wongmakmur.com",
  Password_Login: "Password123*",
  Email_CS: "helen@wongmakmur.com",
  Email_CS1: "san@wongmakmur.com",
  Password_CS: "Password123*",
  PopupAuth:
    "https://admin:68BHr63vBpH2G7jh@staging---frontend-shooting-a6e4wwojjq-et.a.run.app/",
  Data_Name: "tester",
  Data_ID: Math.floor(Math.random() * 100).toString(),
  Data_Phone: Math.floor(Math.random() * 1000000000000)
    .toString()
    .padStart(12, "0"), //padStart memastikan bahwa data memiliki jumlah yang kita inginkan (12) dan 0 untuk memastikan jika panjang kurang dari 6 agar tidak error
  Phone_Dummy: 081315150475,
  Email_Host: "ntr59508@jioso.com",
  New_Email: "unf98323@toaik.com",
  Email_Random: Math.floor(Math.random() * 100).toString() + "@gmail.com",
  Data_Password: "Password123*",
  Address: "Indonesia",
  Sample:
    '//h3[contains(text(), "Sample.fdx")]/ancestor::div[contains(@class, "mb-2")]/following-sibling::div//span[text()="Lihat script"]',
  DragnDrop:
    '//h3[contains(text(), "DragDrop.fdx")]/ancestor::div[contains(@class, "mb-2")]/following-sibling::div//span[text()="Lihat script"]',
  CallSheet:
    '//h3[contains(text(), "CallSheet.fdx")]/ancestor::div[contains(@class, "mb-2")]/following-sibling::div//span[text()="Lihat script"]',
  Bookworm:
    '//h3[contains(text(), "script film bookworm.fdx")]/ancestor::div[contains(@class, "mb-2")]/following-sibling::div//span[text()="Lihat script"]',
  Next: '//button[@class="w-full rounded-lg border border-red-400 p-3 font-medium text-red-400"]',
  Skip: '//button[@class="w-full rounded-lg border border-red-400 p-3 font-medium text-red-400"][text()="Skip"]',
  Create_New:
    '//button[@class="inline-flex h-12 w-[150px] items-center justify-center rounded-lg border border-[#E8655B] bg-white px-8 py-2 text-[#E8655B]"]//span[text()="Create New"]',
  Choose_Date:
    '//div[@class="flex flex-1 items-center justify-center rounded-md px-4 py-2"]//span[@class="ml-2 cursor-pointer text-[12px] font-semibold text-[#434343]"][text()="Tap untuk membuka kalender"]',
  btn_Login:
    "//*[@class='w-full rounded-lg bg-red-500 p-3 font-bold text-white hover:bg-red-600']",
  Login_Pre: '//button[@aria-label="Pre-Production"',
  Login_Prod: '//button[@aria-label="Production"]',
  btnRegistNow:
    "//button[@class='border-b-2 border-b-[#E8655B] font-bold text-[#E8655B]']",
  btnJointTalent:
    "//button[@class='flex w-full items-center justify-center gap-2 rounded-lg bg-red-400 p-3'][@aria-label='Join as Talent']",
  btnRegisterNow:
    "//button[@class='mb-5 w-full rounded-lg bg-red-500 py-3 font-medium text-white hover:bg-red-600']",
};

module.exports = GlobalWMS;

// this.timeout(10000);
//Zoom out
// await driver.executeScript("document.body.style.zoom='50%'");

//Double Click Action
// await driver.actions({ bridge: true }).doubleClick(element).perform;

//Block at second row
// await driver
//   .actions({ bridge: true })
//   .move({ origin: element, x: 0, y: rect.height / 2 }) // Move to start of text
//   .press() // Mouse down
//   .move({ origin: element, x: rect.width - 2, y: rect.height / 2 }) // Drag across text
//   .release() // Mouse up
//   .perform();

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU0LCJuYW1lIjoic2FuIiwiZW1haWwiOiJzYW5Ad29uZ21ha211ci5jb20iLCJyb2xlX2lkIjo0LCJwcm9kdWN0aW9uX2hvdXNlIjp7ImlkIjoxMCwibmFtZSI6IkFydW5pa2EgU3R1ZGlvIiwiaXNfb25ib2FyZGVkIjp0cnVlfSwiaWF0IjoxNzQ3NjM2NTgyLCJleHAiOjE3NTAyMjg1ODJ9.-cpkSJ5zgIkIF1wy4EFeNPaLvS7RCr1jfbYH3HJwTog"; // isi token kamu lengkap di sini
// Select Time on CS: '//div[@class="ant-picker-content"]//ul[@class="ant-picker-time-panel-column"]//li[@class="ant-picker-time-panel-cell"]//div[@class="ant-picker-time-panel-cell-inner"][text()="03"]'
