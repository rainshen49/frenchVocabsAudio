const new$ = document.createElement.bind(document)
const nav = document.querySelector('nav')
const audios = document.querySelector('.audios')
const initial = location.hash === "" ? "Chapitre Préliminaire" : location.hash.slice(1)
fetch('frenchaudios.json')
    .then(res => res.json())
    .then(json => renderAudios(json))
    .then(() => {
        document.querySelector('.loaderwrap').classList.add("hidden")
    })
async function renderAudios(json) {
    for (let chapter in json) {
        const anchor = chapter.split(' ').slice(0, 2).join(' ')
        const link = new$('a')
        link.href = "#" + anchor
        link.textContent = anchor
        nav.appendChild(link)

        const chapterdiv = new$('div')
        const header = new$('h2')
        let loaded = false
        header.textContent = chapter
        header.id = anchor
        chapterdiv.appendChild(header)

        link.onclick = () => {
            // load it onto the dom it not yet
            if (!loaded) {
                audios.appendChild(chapterdiv)
                loaded = true
            }
            chapterdiv.classList.remove("hidden")
            chapterdiv.click()
        }
        if (anchor !== initial) {
            chapterdiv.classList.add("hidden")
        } else {
            audios.appendChild(chapterdiv)
        }
        let prevaud;
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
            
            if (prevaud) {
                prevaud.onend = () => audio.play()
            }
            prevaud = audio

            wrapper.appendChild(audio)
            chapterdiv.appendChild(wrapper)
        })

        await new Promise(
            // keeps the loading ring spinning
            accept => requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                    accept()
                })
            )
        )
    }
}