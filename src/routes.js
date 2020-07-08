const axios = require('axios');
const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => {
  return res.render('index.html');
});

routes.post('/main', async (req, res) => {
  const asset = req.body;
  const symbol = asset.quote;

  try {
    const [setStocks, setNews] = await axios.all([
      axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_6d0042f4630a4e0895c9e06dd7222e1c`),
      axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/news/last/quote?token=pk_6d0042f4630a4e0895c9e06dd7222e1c`)
    ]);

    const { data: stocks } = setStocks;
    const { data: news } = setNews;

    return res.render('main.html', { stocks, news });
  } catch (error) {
    return res.render('error.html');
  };
});


module.exports = routes;
