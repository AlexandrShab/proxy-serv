const express = require('express')
const { pipeline } = require('node:stream/promises')

const PORT = process.env.PORT || 10000

const auth = {
    method: 'get',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWZkYTRjMWQ4YjA3ODAyYjM2MjMxYTI1ZTAwOTBlZiIsInN1YiI6IjY2MmFhYmJlNTAxY2YyMDExZGIzM2I5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pHEhpbpJq7-FfLHmR2C1-Y1E_8qn1h2QL2INlmKPnyw',
        accept: 'application/json',
    }
}
const app = express()
app.get('/api', async (req, res) => {
    console.log(req.query)
    let resp = { ok: false, result: "no URL specified" }
    let api_url = 'https://api.themoviedb.org/3/'
    if (req.query && req.query.hasOwnProperty('url')) {
        console.log(req.query.url)
        try {
            api_url += req.query.url
            let result = await fetch(api_url, auth)
            resp = await result.json()
        } catch (err) {
            resp = { ok: false, error: err }
        }
    }
    res.send(resp)
})

app.get('/image/:fileName', (req, res) => {
    let api_url = 'https://image.tmdb.org/t/p/original/'
    let fileName = req.params['fileName']
    console.log('image: >> ', fileName)
    imageHolder(res, api_url, fileName)
})

app.get('/thumb/:fileName', (req, res) => {
    let api_url = 'https://image.tmdb.org/t/p/w500/'
    let fileName = req.params['fileName']
    console.log('image: >> ', fileName)
    imageHolder(res, api_url, fileName)
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})


async function imageHolder(res, api_url, fileName = false) {
    let result = { ok: false, result: "filename not specified" }

    if (fileName) {
        try {
            api_url += fileName
            result = await fetch(api_url)
            pipeline(result.body, res)
        } catch (err) {
            result = { ok: false, error: err }
            res.send(result)
        }
    } else {
        res.send(result)
    }
}
/*
async function fetchUrl(url, data = false) {
    //url = + '?api_key=e9fda4c1d8b07802b36231a25e0090ef&append_to_response=videos'
    let api_url = 'https://api.themoviedb.org/3/' + url
    let response
    if (data) {
        console.log('URL >>>'.url)
        response = await fetch(api_url, data)
    } else {
        response = await fetch(api_url)
    }
    let res = await response.json()
    console.log(res)
    return res
}
*/