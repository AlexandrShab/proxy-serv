const express = require('express')
const fetch = require('node-fetch-native')

const PORT = process.env.PORT || 10000

const app = express()

app.get('/', async (req, res) => {
    console.log(req.query)
    let result = { ok: false, result: "no URL specified" }
    if (req.query && req.query.hasOwnProperty('url')) {
        result = await fetchUrl(req.query.url)
    }
    res.send(result)

})

app.get('/api', async (req, res) => {
    console.log(req.query)
    let result = { ok: false, result: "no URL specified" }
    if (req.query && req.query.hasOwnProperty('url')) {
        result = await fetchUrl(req.query.url, { method: 'get', headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWZkYTRjMWQ4YjA3ODAyYjM2MjMxYTI1ZTAwOTBlZiIsInN1YiI6IjY2MmFhYmJlNTAxY2YyMDExZGIzM2I5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pHEhpbpJq7-FfLHmR2C1-Y1E_8qn1h2QL2INlmKPnyw' } })
    }
    res.send(result)

})

app.post('/', async (req, res) => {
    console.log(req.query)
    let result = { ok: false, result: "no URL specified" }
    if (req.query && req.query.hasOwnProperty('url')) {
        result = await fetchUrl(req.query.url, req.body)
    }
    res.send(result)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

async function fetchUrl(url, data = false) {
    //url = + '?api_key=e9fda4c1d8b07802b36231a25e0090ef&append_to_response=videos'
    if (data) {
        console.log('URL >>>'.url)
        let response = await fetch(url, data)
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