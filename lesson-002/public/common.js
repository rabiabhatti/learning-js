const apiUrl = 'http://localhost:8080/times'
const timesContainer = document.getElementById('time-entries')

function displayEntries(times) {
    timesContainer.innerHTML = ''
    times.forEach((time) => {
        const paragraph = document.createElement('p')
        const node = document.createTextNode(
            `ID: ${time.id}, Time: ${time.my_date}`
        )

        paragraph.appendChild(node)
        timesContainer.appendChild(paragraph)
    })
}

// (function getAllEntries () {
//     fetch(apiUrl).then(res => res.json())
//     .then(times => {
//         displayEntries(times)
//     }).catch(err => {
//         console.error(err)
//     })
// })();

document.addEventListener('submit', createEntry)

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
        .then((times) => {
            displayEntries(times)
        })
        .catch((err) => console.log(err))
}

function deletelastEntry() {
    fetch(apiUrl, { method: 'DELETE' })
        .then((res) => {
            return res.json()
        })
        .then((times) => {
            displayEntries(times)
        })
        .catch((err) => console.log(err))
}
