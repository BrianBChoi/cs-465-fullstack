/* GET news view */
const news = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'news';
    
    res.render(
        'news', 
        { 
            title: 'Travlr Getaways',
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
   