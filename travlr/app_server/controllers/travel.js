/* GET travel view */
const travel = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'travel';
    
    res.render(
        'travel', 
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
    travel
};
   