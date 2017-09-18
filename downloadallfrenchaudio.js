const chapters = Array.from($$('a'))
const lnks = {}
async function load() {
    for (let a of chapters) {
        const href = a.href.startsWith('https') ? a.href : a.href.replace("http://", "https://")
        const inside = window.open(href)
        inside.onload = ev => {
            console.log(a.textContent, 'loaded')
            doc = ev.target
            audios = Array.from(doc.querySelectorAll('a')).filter(a => a.href.endsWith('.mp3')).map(a => ({
                href:a.href,
                title:a.textContent
            }))
            lnks[a.textContent] = audios
            console.log(inside)
            inside.close()
        }
    }
}
load()