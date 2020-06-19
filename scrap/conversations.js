import { launchPuppeteer } from '../config/puppeteer'
import { createConversation } from '../controller/conversation'
import { scrapConversation } from './conversation'

export const scrapConversations = async () => {
    try {
        const page = await launchPuppeteer()
        await page.waitForSelector('.nav-item__inner')
        await page.exposeFunction('createConversation', createConversation)


        let i = 0;
        let j = 0;
        const countInfiniteLoop = 1000;
        while (i < countInfiniteLoop) {
            i++;

            await scrapConversation(page)

            await page.waitForSelector('.nav')
            await page.$eval('.nav', el => el.scrollBy(0, window.innerHeight));
            
            await page.waitFor(2000);

        }

        // await browser.close()
    } catch (error) {
        console.log('scrap conversations error: ', error)
    }
}