/* GET rooms view */
const rooms = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'rooms';
    
    res.render(
        'rooms', 
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
    rooms
};
   