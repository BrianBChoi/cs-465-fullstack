var fs = require('fs');

// TODO: Stop loading content by JSON
var home_latest_blogs = JSON.parse(fs.readFileSync('./data/home-latest-blogs.json', 'utf-8'));
var rooms_list = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf-8'));

/* GET HOMEPAGE */
const index = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'home';
    
    res.render(
        'index', 
        { 
            title: 'Travlr Getaways',
            home_latest_blogs,
            page: 
            {
                value: value
            }
        }
    );
};

/* GET ROOM PAGE */
const room = (req, res) => {
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
    index,
    room
};