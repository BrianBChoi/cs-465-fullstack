/* GET contact view */
const contact = (req, res) => {
    // For highlighting nav element in header and footer
    const value = 'contact';
    
    res.render(
        'contact', 
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
    contact
};
   