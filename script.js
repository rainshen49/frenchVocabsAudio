const new$ = document.createElement.bind(document)
const nav = document.querySelector('nav')
const audios = document.querySelector('.audios')
fetch('frenchaudios.json')
    .then(res => res.json())
    .then(json => renderAudios(json))
    .then(() => {
        document.querySelector('.loader').style.visibility = "hidden"

    })
async function renderAudios(json) {
    for (let chapter in json) {
        const anchor = chapter.split(' ').slice(0, 2).join(' ')
        const link = new$('a')
        link.href = "#" + anchor
        link.textContent = anchor
        nav.appendChild(link)
        const header = new$('h2')
        header.textContent = chapter
        header.id = anchor
        audios.appendChild(header)
        json[chapter].forEach(({ href, title }) => {
            const wrapper = new$('div')
            wrapper.classList.add('audiowrapper')
            const label = new$('label')
            label.textContent = title
            wrapper.appendChild(label)
            const audio = new$('audio')
            audio.src = href
            audio.setAttribute('controls', '')
            audio.setAttribute('preload', 'none')
            wrapper.appendChild(audio)
            audios.appendChild(wrapper)
        })
        await new Promise(
            accept => requestAnimationFrame(() =>
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                        accept()
                        requestAnimationFrame(() => null)
                    })
                )
            )
        )
    }
}