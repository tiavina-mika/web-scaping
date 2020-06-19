import puppeteer from 'puppeteer-extra'
import stealthPlugin from 'puppeteer-extra-plugin-stealth'

export const launchPuppeteer = async () => {
    try {
        puppeteer.use(stealthPlugin())
        const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args:['--start-maximized','--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage()
    
        await page.goto('https://app.chatra.io/chat/box:all')
        await page.waitFor(2000)

        await page.click('#signin-email')
        await page.keyboard.type('chatra@lrn.me')

        await page.click('#signin-password')
        await page.keyboard.type('V0lpyR0ck$')

        await page.click('.test-button-signin-submit')

        // await page.waitFor(1000)
        // await page.click('.nav-item__last-message-text')

        await page.waitFor(1000)
        return page
    } catch (error) {
        console.log('puppeteer launch error: ', error)
    }
}