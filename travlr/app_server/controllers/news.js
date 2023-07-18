var fs = require('fs');

// TODO: Stop loading content by JSON
var news_latest_links = JSON.parse(fs.readFileSync('./data/news-latest-links.json', 'utf-8'));
var news_tips_links = JSON.parse(fs.readFileSync('./data/news-tips-links.json', 'utf-8'));

/* GET news view */
const news = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'news';
    
    res.render(
        'news', 
        { 
            title: 'Travlr Getaways',
            news_latest_links,
            news_tips_links,
            page: 
            {
                value: value
            }
        }
    );
};
module.exports = {
    news
};
   