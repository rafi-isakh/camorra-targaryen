const request = require('request')
const cheerio = require('cheerio')
const readline = require('readline')

const urls = require('./url.json')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const str = rl.question('Masukan keyword: ', function(key) {
    search(key)
    rl.close();
})

function search(value) {
    urls.url.map(item =>  callUrl(item, value)

    )
}

function callUrl(item, value) {
        request(item ,function(error, response, body) {
        if(!error && response.statusCode == 200) {

            let $ = cheerio.load(body)
            //FIXME
            const paragraph = $('body').find('p').text()
            const div = $('body').find('div').text()
            const tes = paragraph + div
            const str = new RegExp(value, "gi")
            const count = tes.match(str)

            count === null ? console.log(`Tidak ditemukan ${value} di ${item}`) :
                             console.log(`Domain ${item} mempunyai ${value}  sebanyak : ${count.length}`)


        }
    })
}
