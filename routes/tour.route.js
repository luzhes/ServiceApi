const express = require('express');
const {getAllTours} = require('../src/dataBase/tour.db')
const tourRoute = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Tour:
 *          type: object
 *          properties:
 *              year:
 *                  type: integer
 *                  description: the tour year
 *              name:
 *                  type: string
 *                  description: the tour name
 *              band:
 *                  type: string
 *                  description: the band code
 *          required:
 *              - year
 *              - name
 *              - band
 *          example:
 *              year: 2022
 *              name: 'Latidos'
 *              band: 'THE SCRIPT'
 *  
 */

/**
 * @swagger
 * /api/tours:
 *  get:
 *      summary: Return all tours
 *      tags: [Tour]
 *      responses:
 *          200:
 *              description: get all Tours
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */

tourRoute.get('/tours', async (req, res) => {
    const { success, data } = await getAllTours()
    if (success) {
        return res.json({
            success,
            data
        })
    }
    return res.status(500).json({
        success: false,
        messsage: "Error"
    })
})

module.exports = tourRoute;