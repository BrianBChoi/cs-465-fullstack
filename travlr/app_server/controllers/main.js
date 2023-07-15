/* GET HOMEPAGE */
const index = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'home';
    
    res.render(
        'index', 
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
    index
};