/* GET about view */
const about = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'about';
    
    res.render(
        'about', 
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
    about
};
   