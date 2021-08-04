const puppeteer = require('puppeteer');
const APP = `http://localhost:8080/`;


describe('Front-end Integration/Features', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setupid-sandbox'],
    });
    page = await browser.newPage();
  });

  afterAll(() => {
    browser.close();
  });

  describe('Initial display', () => {
    it('loads successfully', async () => {
      // We navigate to the page at the beginning of each case so we have a
      // fresh start
      await page.goto(APP);
      await page.waitForSelector('#body');
      const title = await page.$eval('#body', el => el.innerHTML);
      expect(title).toBe('');
    });

    xit('displays a usable input field for locations', async () => {
      await page.goto(APP);
      await page.waitForSelector('#new-location');
      await page.focus('#new-location');
      await page.keyboard.type('Tallahassee');
      const inputValue = await page.$eval('#new-location', el => el.value);
      expect(inputValue).toBe('Tallahassee');
    });
  });
});