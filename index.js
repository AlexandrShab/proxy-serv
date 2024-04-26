const express = require('express')
const fetch = require('node-fetch-native')

const PORT = process.env.PORT || 7000

const app = express()

app.get('/', async (req, res) => {
    console.log(req.query)
    let result = await fetchUrl(req.query.url)
    res.send(result)
})

app.post('/', async (req, res) => {
    console.log(req.query)
    let result = await fetchUrl(req.query.url, req.body)
    res.send(result)
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

async function fetchUrl(url, data = false) {
    if (data) {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        let response = await fetch(url, options)
        let res = await response.json()
        console.log(res)
        return res
    } else {
        let response = await fetch(url)
        let res = await response.json()
        console.log(res)
        return res
    }

}