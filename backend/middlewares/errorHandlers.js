const notFoundErr = (req, res) => {
    res.status(404).send('Not Found');
}

const genericErr = (err, req, res) => {
    /*const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || 'Something went wrong';*/
    res.status(500).json({error: err
    });
}

module.exports = {
    genericErr,
    notFoundErr
};