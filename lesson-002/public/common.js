const apiUrl = 'http://localhost:8080/times'
const timesContainer = document.getElementById('time-entries')

let entries = []

function displayEntries() {
    timesContainer.innerHTML = ''
    entries.forEach((time) => {
        const paragraph = document.createElement('p')
        const node = document.createTextNode(
            `ID: ${time.id}, Create at: ${time.createdAt}`
        )

        paragraph.appendChild(node)
        timesContainer.appendChild(paragraph)
    })
}

;(function getAllEntries() {
    fetch(apiUrl)
        .then((res) => res.json())
        .then((times) => {
            entries = times
            displayEntries()
        })
        .catch((err) => {
            console.error(err)
        })
})()

function createEntry(e) {
    e.preventDefault()
    const id = document.querySelector('#id-input').value

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
        .then((res) => res.json())
        .then((entry) => {
            entries.push(entry)
            displayEntries()
        })
        .catch((err) => console.log(err))
}

function deletelastEntry() {
    fetch(apiUrl, { method: 'DELETE' })
        .then((res) => res.json())
        .then((entry) => {
            entries = entries.filter((item) => item.id !== entry.id)
            displayEntries()
        })
        .catch((err) => console.log(err))
}

document.addEventListener('submit', createEntry)
