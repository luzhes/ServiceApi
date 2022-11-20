const { getAllConcerts, getConcertById, registerConcert, removeConcert, _updateConcert } = require('../service/concert.service');
const codeSuccess = 200;
const codeErrorServe = 500;
const codeErrorNotF = 404;


const concerts = async (req, res) => {
    const { result, data } = await getAllConcerts()

    if (result) {
        return res.json({ result, data, code: codeSuccess })
    }
    return res.json({ result: false, messsage: "Server Error", code: codeErrorServe })
}

const concert = async (req, res) => {
    const { sortId } = req.params;
    const { result, data } = await getConcertById(sortId);
    if (result) {
        if (Object.keys(data).length != 0) {
            return res.json({ result, data, code: codeSuccess });
        } else {
            return res.json({ result: false, message: "Concert not found!", code: codeErrorNotF });
        }
    }
    return res.json({ result: false, message: "Server Error", code: codeErrorServe });
}

const createConcert = async (req, res) => {
    const dataValid = req.body;
    if (dataValid.location && dataValid.date && dataValid.stadium && dataValid.tour) {
        const { result } = await registerConcert(req.body)
        if (result) {
            return res.json({ result, message: 'Register success!!!', code: 201 })
        }
        return res.json({ result, message: 'Server Error', code: codeErrorServe })
    }
    else {
        return res.json({ result: false, message: 'Check the data...', code: 400 })
    }
}

const deleteConcert = async (req, res) => {
    const { sortId } = req.params;
    const { result, data } = await getConcertById(sortId);
    if (result) {
        if (Object.keys(data).length != 0) {
            const { result } = await removeConcert(sortId)
            return res.json({ result: result, message: "Concert deleted success!", code: codeSuccess })
        } else {
            return res.json({ result: false, message: "Concert not found!", code: codeErrorNotF });
        }
    }
    return res.json({ result: false, message: "Server Error", code: codeErrorServe });

}
const updateConcert = async (req, res) => {

    const { sortId } = req.params;
    const { result, data } = await getConcertById(sortId);
    if (result) {
        if (Object.keys(data).length != 0) {
            const { result } = await _updateConcert(sortId, req.body)
            if (result) {
                return res.json({ result, message: 'Update success!!!', code: codeSuccess })
            }
            return res.json({ result, message: 'Server Error', code: codeErrorServe })
        } else {
            return res.json({ result: false, message: "Concert not found!", code: codeErrorNotF });
        }
    }
    return res.json({ result: false, message: "Server Error", code: codeErrorServe });
}

module.exports = {
    concerts,
    concert,
    createConcert,
    deleteConcert,
    updateConcert
}
