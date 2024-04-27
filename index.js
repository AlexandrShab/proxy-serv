const express = require('express')
//const fetch = require('node-fetch-native')
const proxy = require('express-http-proxy')


const PORT = process.env.PORT || 10000

const app = express()

app.use('/thumb', proxy('https://image.tmdb.org/t/p/original/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg'))
app.use('/image', proxy('https://image.tmdb.org/t/p/original/FUnAVgaTs5xZWXcVzPJNxd9qGA.jpg'))

/* {//eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg'
proxyReqPathResolver: function (req) {
    var parts = req.url.split('/');
    var fileName = parts.pop();
    return fileName ? fileName : '';
}
}
*/

//pp.use('/image', proxy('https://images.unsplash.com/photo-1566275529824-cca6d008f3da?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvdG98ZW58MHx8MHx8fDA%3D'))

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
        result = await fetchUrl(req.query.url, {
            method: 'get',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWZkYTRjMWQ4YjA3ODAyYjM2MjMxYTI1ZTAwOTBlZiIsInN1YiI6IjY2MmFhYmJlNTAxY2YyMDExZGIzM2I5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pHEhpbpJq7-FfLHmR2C1-Y1E_8qn1h2QL2INlmKPnyw',
                accept: 'application/json',
            }
        })
    }
    res.send(result)

})







/*

app.get('/image', async (req, res) => {
     console.log(req.query)
    let result = { ok: false, result: "no URL specified" }
     if (req.query && req.query.hasOwnProperty('url')) {
         result = await fetchImage(req.query.url)     }

    let result = await fetch('https://images.unsplash.com/photo-1566275529824-cca6d008f3da?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvdG98ZW58MHx8MHx8fDA%3D')
    console.log('GET: /image')
    //console.log(result.body)
    console.log('type: >> ', typeof result.body)
    console.log('body: >> ', result.body)

    let reader = result.body.getReader()
    let full
    let received = 0;
    reader.read().then(function processImg({ done, value }) {

        if (done) {
            console.log('Готово')
            res.send(Buffer.from(full))
        }


        full += value
        console.log('Получено: >> ')

        return reader.read().then(processImg);

    })


    // result.body.pipeTo(res)


})
*/


/*
app.post('/', async (req, res) => {
    console.log(req.query)
    let result = { ok: false, result: "no URL specified" }
    if (req.query && req.query.hasOwnProperty('url')) {
        result = await fetchUrl(req.query.url, req.body)
    }
    res.send(result)
})
*/
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

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