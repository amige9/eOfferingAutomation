import { chromium, Page, BrowserContext, Browser } from '@playwright/test';
import  POManager  from "../../pageObject/POManager";
import { Before, BeforeStep, Status, After, BeforeAll, AfterAll} from "@cucumber/cucumber";
import { invokeBrowser } from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';
import { createLogger, Logger } from 'winston';
import { options } from '../helper/utils/logger';
// import { Logger } from '../helper/types/logger';

let browser: Browser;
let context: BrowserContext;
// let page: Page;
let page: Page & { logger?: Logger }; // Extend Page type with logger

BeforeAll({timeout: 60 * 1000},async function()
{
    getEnv();
    browser = await invokeBrowser();
    // browser = await chromium.launch({ headless: false});
})

Before( {timeout: 60 * 1000}, async function({pickle})
{
    const scenarioName = pickle.name + pickle.id;
    context = await browser.newContext();
    page = await context.newPage();
    const logger = createLogger(options(scenarioName));
    page.logger = logger as Logger;
    this.page = page;
    this.poManager = new POManager(page); 

})

BeforeStep(function () {
    // This hook will be executed before all steps in a scenario  
});


After(async function ({ result, pickle }) {

    if (result?.status === Status.FAILED) {
        // const img = await page.screenshot({ path: 'screenshot.png'});
        const img = await page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type:"png" });
        await this.attach(img, "image/png");
    }

    await context.close();
    // browser.close();
    // page.close();

});

AfterAll(async function() {
    await browser.close();
});

// After(async function ({ pickle }) {

//         // result.status === Status.FAILED
//         const img = await page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type:"png" });
//         await this.attach(img, "screenshot.png");
    
// });
