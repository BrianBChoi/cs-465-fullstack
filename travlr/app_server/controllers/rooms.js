var fs = require('fs');

// TODO: Stop loading content by JSON
var rooms_list = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf-8'));

/* GET rooms view */
const rooms = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'rooms';
    
    res.render(
        'rooms', 
        { 
            title: 'Travlr Getaways',
            rooms_list,
            page: 
            {
                value: value
            }
        }
    );
};
module.exports = {
    rooms
};
   