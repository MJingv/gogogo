const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({
        width: 1000,
        height: 5000,
        deviceScaleFactor: 2
    })
    await page.goto('http://localhost:3000/', {waitUntil: 'load', timeout: 0});
    //获取页面Dom对象
    const start = new Date().valueOf()
    console.log(start, '---start')
    const captureScreenshotsOfElements = async (elements) => {
        let i = 0;
        for (const element of elements) {
            const id = await page.evaluate(el => el.id, element)
            const path = `img/${id}-${(i) % 6 + 1}.jpeg`
            console.log(path)
            await element.screenshot({path, quality: 20});
            i += 1;
        }
    };

    const gadgets = await page.$$('.table-root');
    await captureScreenshotsOfElements(gadgets, page);
    const end = new Date().valueOf()
    console.log(end - start, '----total')
    await browser.close();
})();