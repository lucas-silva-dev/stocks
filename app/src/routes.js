const axios = require('axios');
var value1 = "";
var value2 = "";

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  app.post('/', (req, res) => {
    res.render('index.ejs');
  });

  app.post('/main', (req, res) => {
    let asst = req.body;
    let simbolo = asst.quote;

    axios.all([
      axios.get(`https://cloud.iexapis.com/stable/stock/${simbolo}/quote?token=pk_6d0042f4630a4e0895c9e06dd7222e1c`),
      axios.get(`https://cloud.iexapis.com/stable/stock/${simbolo}/news/last/quote?token=pk_6d0042f4630a4e0895c9e06dd7222e1c`)
    ]).then(axios.spread((stock, news) => {
      value1 = stock.data
      value2 = news.data
    })).then(() => res.render('main.ejs', { value1, value2 }))
       .catch(() => res.render('error.ejs'))
  })
};
