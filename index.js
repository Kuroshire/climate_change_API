const PORT = process.env.PORT || 5000;

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const newspapers = [
    {
        name: 'cityam',
        address: 'https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/',
        base: ''
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: '',
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk',
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/international/section/climate',
        base: '',
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/environment',
        base: '',
    },
    {
        name: 'smh',
        address: 'https://www.smh.com.au/environment/climate-change',
        base: 'https://www.smh.com.au',
    },
    {
        name: 'un',
        address: 'https://www.un.org/climatechange',
        base: '',
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news/science_and_environment',
        base: 'https://www.bbc.co.uk',
    },
    {
        name: 'es',
        address: 'https://www.standard.co.uk/topic/climate-change',
        base: 'https://www.standard.co.uk'
    },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/topic/climate-change-environment/',
        base: ''
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html',
        base: ''
    },
    {
        name: 'nyp',
        address: 'https://nypost.com/tag/climate-change/',
        base: ''
    }
]

const articles = [];

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            //filter for a tag type a, containing the word climate.
            // once done, we get all the articles in the $ variable so we can just get datas we care about (ie: title, url etc).
            $('a:contains("climate")', html).each(function() {
                const title = $(this).text()
                const url = $(this).attr('href');

                articles.push({
                    title,
                    url: newspaper.base + url,
                    source : newspaper.name
                })
            })

        }).catch((err) => console.log(err))
})


app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId

    const newspaper = newspapers.filter(newspaper => newspaper.name == newspaperId)

    const address = newspaper[0].address
    const base = newspaper[0].base

    axios.get(address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            const specificArticles = []

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text();
                const url = $(this).attr('href');

                specificArticles.push({
                    title,
                    url: base + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))

})


app.get('/', (req, res) => {
    res.json('Welcome to my Climate Change News API! Go to /news to see which articles are available!')
})

app.get('/news', (req, res) => {
    res.json(articles);
})

app.listen(PORT, () => console.log(`server is runnin on PORT ${PORT}`));