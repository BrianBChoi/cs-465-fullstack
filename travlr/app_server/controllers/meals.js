var fs = require('fs');

// TODO: Stop loading content by JSON
var meals_list = JSON.parse(fs.readFileSync('./data/meals.json', 'utf-8'));

/* GET meals view */
const meals = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'meals';
    
    res.render(
        'meals', 
        { 
            title: 'Travlr Getaways',
            meals_list,
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
   