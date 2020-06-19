export const scrapConversation = async (page) => await page.evaluate(async () => {
    const data = []

    const items = document.querySelectorAll('.nav-item__inner');

    for (let n = 0; n < items.length; n++) {
        // const element = (i > 0) ? items[Number(n) + Number(j)] : items[n];
        const element = items[n];
        const previousElement = items[n-1]
        element.click();

        // scrap each page
        const dateMessage = previousElement? previousElement.children[1].children[0].children[1].lastElementChild: element.children[1].children[0].children[1].lastElementChild
        const date = document.querySelector('.chat-date-block')
        const client = document.querySelector('.navbar__title-text')
        const status = document.querySelector('.status')
        const main = document.querySelector('.content-layout__main')
        const id = previousElement && previousElement.getAttribute('href') ? previousElement.getAttribute('href').split('/')[2]: undefined
        const currentElement = [...main.children].find(m => m.getAttribute('id') === id)
        const elements = currentElement && [...currentElement.children[0].children[0].children].filter(e => e.classList.contains("chat-message"))
        const messages = []

        elements && [...elements].map(element => { 
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
                messageId: element.getAttribute('id')? element.getAttribute('id'): contactFormSubmitted.getAttribute('id'),
                name: name? name.innerText: undefined,
                forwardedTo: forwardedTo && forwardedTo.innerText !== ']' ? forwardedTo.innerText: undefined,
                time: element.children[1].children[0].children[2].innerText,
                profilPic: profilPic && profilPic.getAttribute('class').includes('userpic__img')? profilPic.src: undefined,
                message : contactFormSubmitted && contactFormSubmitted.getAttribute('class') && contactFormSubmitted.getAttribute('class').includes('chat-bubble--contactFormSubmitted')
                ?   {
                        messageType: 'form',
                        status: formQuotes? formQuotes.innerText: undefined,
                        quotes: quotes && quotes.getAttribute('class') && quotes.getAttribute('class').includes('chat-bubble__quote')
                            ? {
                                name:  quotes.children[0].children[0]? quotes.children[0].children[0].innerText: undefined,
                                email: quotes.children[0].children[1]? quotes.children[0].children[1].innerText: undefined,
                            }
                            : undefined 
                    }
                :  {
                        messageType: 'text',
                        text: message && message.getAttribute('class') && message.getAttribute('class').includes('chat-bubble__text')? message.innerText: undefined
                    },
                status: status && status.getAttribute('class') && status.getAttribute('class').includes('chat-bubble--service')? status.innerText: undefined,
                country : country && country.getAttribute('class') === 'chat-bubble__normal'? country.innerText: undefined,
            })
        })

        let savedConversation
        if (date && id) {
            savedConversation = await window.createConversation({
                id: id ? id: '',
                date: dateMessage? { 
                    timezone:  dateMessage.getAttribute('datetime')? dateMessage.getAttribute('datetime'): undefined,
                    title:  dateMessage.getAttribute('title')? dateMessage.getAttribute('title'): undefined,
                }: undefined,
                dateLatest:  dateMessage.getAttribute('title')? dateMessage.getAttribute('title'): undefined,
                client: client ? client.innerText: '',
                status: status ? status.title: '',
                messages
            })
        }

        savedConversation && data.push( `[${savedConversation.client}]`)

        await new Promise((resolve) => setTimeout(resolve, 2500))
        // next click
    }

    return data
})