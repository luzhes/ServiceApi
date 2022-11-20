const express = require('express');
const tourRoute = express.Router();
const { tours, tour, createTour, deleteTour, updateTour } = require('../src/controller/tour')

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
 *              band: 'BAND-'
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

tourRoute.get('/tours', tours);

/**
 * @swagger
 * /api/tour/{sortId}:
 *  get:
 *      summary: Return a tour
 *      tags: [Tour]
 *      parameters:
 *          - in: path
 *            name: sortId
 *            schema:
 *                  type: string
 *            required: true
 *            description: the tour id 
 *      responses:
 *          200:
 *              description: get one Tour
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          404:
 *              description: tour not found!
 */

tourRoute.get("/tour/:sortId", tour);

/**
 * @swagger
 * /api/tour/createTour:
 *  post:
 *      summary: Create a new tour
 *      tags: [Tour]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Tour'
 *      responses:
 *          201:
 *              description: new tour created!
 * 
 */

tourRoute.post('/tour/createTour', createTour)

/**
 * @swagger
 * /api/tour/{sortId}:
 *  delete:
 *      summary: delete a tour
 *      tags: [Tour]
 *      parameters:
 *          - in: path
 *            name: sortId
 *            schema:
 *                  type: string
 *            required: true
 *            description: the tour is deleting 
 *      responses:
 *          200:
 *              description: tour deleted
 *          404:
 *              description: tour not found!
 */
tourRoute.delete('/tour/:sortId', deleteTour);


/**
* @swagger
* /api/tour/{sortId}:
*  put:
*      summary: update a tour
*      tags: [Tour]
*      parameters:
*          - in: path
*            name: sortId
*            schema:
*               type: string
*            required: true
*            description: the tour is update 
*      requestBody:
*          required: true
*          content:
*              application/json:
*               schema:
*                  type: object
*                  $ref: '#/components/schemas/Tour'
*      responses:
*          200:
*              description: tour update!
*          400:
*              description: tour not found!
* 
*/

tourRoute.put('/tour/:sortId', updateTour)

module.exports = tourRoute;