const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({
        width: 1000,
        height: 5000,
        deviceScaleFactor: 2
    })
    await page.goto('http://localhost:3000/');
    //获取页面Dom对象

    const captureScreenshotsOfElements = async (elements) => {
        let i = 0;
        for (const element of elements) {
            await element.screenshot({ path: `img/${i}.jpeg`,quality:20 });
            i += 1;
        }
    };

    const gadgets = await page.$$('.ant-table-wrapper');
    await captureScreenshotsOfElements(gadgets, page);


    await browser.close();
})();