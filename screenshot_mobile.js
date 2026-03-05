const puppeteer = require('puppeteer');
(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 375, height: 812, isMobile: true, deviceScaleFactor: 2 });
        await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
        await page.screenshot({ path: '/home/gnomad/.gemini/antigravity/brain/04128231-29e0-4792-a30a-b68cc92c8f55/media__1772162551000.png', fullPage: true });
        await browser.close();
        console.log('Done');
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
