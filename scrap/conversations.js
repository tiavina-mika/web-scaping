import { launchPuppeteer } from '../config/puppeteer'

export const scrapConversations = async () => {
    try {
        const page = await launchPuppeteer()
        await page.waitForSelector('.nav-item__inner')
        const result = await page.evaluate(async () => {
            const data = []

            const length = document.querySelectorAll('.nav-item__inner').length
            for (let n = 0; n < length; n++) {
                const element = document.querySelectorAll('.nav-item__inner').item(n)
                element.click();
                
                // scrap each page
                const elements = document.querySelectorAll('.chat-message')
                const date = document.querySelector('.chat-date-block')
                const client = document.querySelector('.navbar__title-text')
                const status = document.querySelector('.status')
                const id = document.querySelector('.js-scroller')
                const messages = []
    
                for (const element of elements) { 
                    const name = element.children[1].children[0].children[0]
                    const forwardedTo = element.children[1].children[0].lastElementChild
                    const country = element.children[1].children[1].children[0].children[1]
                    const message = element.children[1].children[1].children[0].children[0]
                    const contactFormSubmitted = element.children[1].children[1]
                    const quotes = element.children[1].children[1].children[0].children[1]
                    const formQuotes = element.children[1].children[1].children[0].children[0]
                    const profilPic = element.children[0].children[0].children[0].children[1]
                    const status = element.children[1].children[1]
    
                    messages.push({
                        name: name? name.innerText: undefined,
                        forwardedTo: forwardedTo && forwardedTo.innerText !== ']' ? forwardedTo.innerText: undefined,
                        time: element.children[1].children[0].children[2].innerText,
                        profilPic: profilPic && profilPic.getAttribute('class').includes('userpic__img')? profilPic.src: undefined,
                        message : contactFormSubmitted && contactFormSubmitted.getAttribute('class') && contactFormSubmitted.getAttribute('class').includes('chat-bubble--contactFormSubmitted')
                            ?   {
                                status: formQuotes? formQuotes.innerText: undefined,
                                quotes: quotes && quotes.getAttribute('class') && quotes.getAttribute('class').includes('chat-bubble__quote')
                                ? {
                                    name:  quotes.children[0].children[0]? quotes.children[0].children[0].innerText: undefined,
                                    email: quotes.children[0].children[1]? quotes.children[0].children[1].innerText: undefined,
                                }
                                : undefined
                            }
                            : message && message.getAttribute('class') && message.getAttribute('class').includes('chat-bubble__text')? message.innerText: undefined, 
                        status: status && status.getAttribute('class') && status.getAttribute('class').includes('chat-bubble--service')? status.innerText: undefined,
                        country : country && country.getAttribute('class') === 'chat-bubble__normal'? country.innerText: undefined,
                    })
                }
                data.push({
                    id: id? id.getAttribute('id'): '',
                    date: date? date.innerText: '',
                    client: client? client.innerText: '',
                    status: status? status.title: '',
                    messages
                })  
                // end scaping page

                await new Promise((resolve) => setTimeout(resolve, 2500))
                // next click
            }
            return data
        })

        // console.log('result: ', JSON.stringify(result))

        return result

        // await browser.close()
    } catch (error) {
        console.log('scrap conversations error: ', error)
    }
}