This project is a training project to learn how to create an API and deploy it

This API gives us a way to access articles from different Newspapers website 

Currently using : 
City AM, The Times, Guardian, Telegraph, New York Times, 
LA Times, Sydney Morning Herald, United Nations, BBC, 
Evening Standard, The Sun, Daily Mail, New York Post


Articles scrapped are the ones containing the word 'climate' in them. (the goal of this API is to get articles related to climate change)
This API uses express, axios, and cheerio to access data online and scrap website to find the areticles we are looking for.


It is deployed with Heroku at :
https://kuroshire-climatechangeapi.herokuapp.com

to see the artucles right away go to :
https://kuroshire-climatechangeapi.herokuapp.com/news 

By adding the name of one of the supported website after the url, you can filter the articles based on the website they are coming from.
Available names:
cityam, thetimes, guardian, telegraph, nyt, latimes, smh, un, bbc, es, sun, dm, nyp
