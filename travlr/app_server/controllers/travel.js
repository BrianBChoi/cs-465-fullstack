const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

// Temporarily loaded static JSON
// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf-8'));

/* GET travel view */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    // Log API call in console
    console.info('>> travelController.travelList calling ' + requestOptions.url);
    
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    )
};

/* Internal method to render the travel list */
const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = 'Travlr Getaways - Travel';
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in our database!';
        }
    }

    // For highlighting nav element in header and footer
    const value = 'travel';

    res.render('travel', 
        {
            title: pageTitle,
            trips: responseBody,
            message,
            page: 
            {
                value: value
            }
        }
    );
}

const travelDetails = (req, res) => {
    const tripCode = req.params.tripCode;
    const path = '/api/trips/' + tripCode;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    // Log API call in console
    console.info('>> travelController.travelDetails calling ' + requestOptions.url);
    
    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            renderTravelDetails(req, res, body);
        }
    )
};

/* Internal method to render travel details */
const renderTravelDetails = (req, res, responseBody) => {
    let message = null;
    let pageTitle = 'Travlr Getaways - Travel';

    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'That trip does not exist in our database!';
        }
    }

    console.info(responseBody);

    // For highlighting nav element in header and footer
    const value = 'travel';

    const path = '../';

    res.render('travelDetails', 
        {
            title: pageTitle,
            tripDetail: responseBody[0],
            message,
            page: 
            {
                value: value,
                path: path
            },
            path: path
        }
    );
}

module.exports = {
    travelList,
    travelDetails
};
   