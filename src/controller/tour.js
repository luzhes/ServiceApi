const { getAllTours, getTourById, registerTour, removeTour, _updateTour } = require('../service/tour.service')
const codeSuccess = 200;
const codeErrorServe = 500;
const codeErrorNotF = 404;


const tours = async (req, res) => {
    const { result, data } = await getAllTours()
    if (result) {
        return res.json({ result: result, data, code: codeSuccess })
    }
    return res.json({ result: false, messsage: "Server Error", code: codeErrorServe })
}

const tour = async (req, res) => {
    const { sortId } = req.params;
    const { result, data } = await getTourById(sortId);
    if (result) {
        if (Object.keys(data).length != 0) {
            return res.json({ result, data, code: codeSuccess });
        } else {
            return res.json({ result: false, message: "Tour not found!", code: codeErrorNotF });
        }
    }
    return res.json({ result: false, message: "Server Error", code: codeErrorServe });
}

const createTour = async (req, res) => {
    const dataValid = req.body;
    if (dataValid.year && dataValid.name && dataValid.band) {
        const { result } = await registerTour(req.body)
        if (result) {
            return res.json({ result: result, message: 'Inserted data into Dynamodb was success!', code: 201 })
        }
        return res.json({ result: result, message: 'Server Error', code: codeErrorServe })
    }
    else {
        return res.json({ result: false, message: 'Check the data...', code: 400 })
    }
}

const deleteTour = async (req, res) => {
    const { sortId } = req.params;
    const { result, data } = await getTourById(sortId);
    if (result) {
        if (Object.keys(data).length != 0) {
            const { result } = await removeTour(sortId)
            return res.json({ result: result, message: "Tour deleted success!", code: codeSuccess })
        } else {
            return res.json({ result: false, message: "Tour not found!", code: codeErrorNotF });
        }
    }
    return res.json({ result: false, message: "Server Error", code: codeErrorServe });
}

const updateTour = async (req, res) => {
    const { sortId } = req.params;
    const { result, data } = await getTourById(sortId);
    if (result) {
        if (Object.keys(data).length != 0) {
            const { result } = await _updateTour(sortId, req.body)
            if (result) {
                return res.json({ result, message: 'Update success!!!', code: codeSuccess })
            }
            return res.json({ result, message: 'Server Error', code: codeErrorServe })
        } else {
            return res.json({ result: false, message: "Tour not found!", code: codeErrorNotF });
        }
    }
    return res.json({ result: false, message: "Server Error", code: codeErrorServe });
}

module.exports = {
    tours,
    tour,
    createTour,
    deleteTour,
    updateTour
}
