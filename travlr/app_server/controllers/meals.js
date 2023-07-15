/* GET meals view */
const meals = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'meals';
    
    res.render(
        'meals', 
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
    meals
};
   