const apiUrl = 'http://localhost:8080/times';

(function getAllEntries () {
    fetch(apiUrl).then(response => {
        return response.json()
    }).then(times => {
    
        times.forEach(time => {
            const paragraph = document.createElement("p")
            const node = document.createTextNode(`ID: ${time.id}, Time: ${time.my_date}`)
            paragraph.appendChild(node)
    
            var container = document.getElementById("time-entries");
            container.appendChild(paragraph);
        })
    
    }).catch(err => {
        console.error(err)
    })
})()