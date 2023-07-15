var fs = require('fs');

// TODO: Stop loading content by JSON
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf-8'));

/* GET travel view */
const travel = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'travel';
    
    res.render(
        'travel', 
        { 
            title: 'Travlr Getaways',
            trips,
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
   