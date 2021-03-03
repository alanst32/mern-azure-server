import { ReadPreference } from 'mongodb';
import Client, { ClientInterface, ClientSearchRequestDto } from '../model/client.model';
import { Request, Response } from 'express';
import { FilterQuery, Query } from 'mongoose';
import { inspect } from 'util' // or directly
import _ from 'lodash';

/**
 * Search clients by name or skills
 * 
 * @param req 
 * @param res 
 */
async function getClients(req: Request<ClientSearchRequestDto>, res: Response<Array<ClientInterface>>) {
    const query = Client.find();
    const filterQueryArray: Array<FilterQuery<ClientInterface>> = new Array<FilterQuery<ClientInterface>>();
    if (req.body.name) {
        filterQueryArray.push({firstName: {$regex: req.body.name}});
        filterQueryArray.push({lastName: {$regex: req.body.name}});
    }

    if(!_.isEmpty(req.body.skills)) {
        filterQueryArray.push({skills: {$all: req.body.skills}});
    }

    if(!_.isEmpty(filterQueryArray)) {
        query.or(filterQueryArray);
    }

    await query
        .sort({firstName:1,lastName:1})
        .exec()
        .then(clients => {
            return res.send(clients);
        })
        .catch(err => {
            console.log(err);
        });; 
}

/**
 * Insert new Client
 * 
 * @param req 
 * @param res 
 */
async function insertClient(req: Request<ClientInterface>, res: Response) {
    await Client
        .create(req.body)
        .then(client => {
            return res.status(200).send();
        })
        .catch(err => {
            console.log(err);
        });
}

/**
 * Update Client data
 * 
 * @param req 
 * @param res 
 */
async function updateClient(req: Request<ClientInterface>, res: Response) {
    await Client
        .updateOne(req.body)
        .then(client => {
            return res.status(200).send();
        })
        .catch(err => console.log(err));
}

/**
 * Delete Client data
 * 
 * @param req 
 * @param res 
 */
async function deleteClient(req: Request<any>, res: Response) {
    if (!req.params && !req.params.id) {
        res.status(400).send();
        return;
    }

    await Client
        .deleteOne({id: req.params.id})
        .then(client => {
            return res.status(200).send();
        })
        .catch(err => console.error(err));
}

export {
    getClients,
    insertClient,
    updateClient,
    deleteClient
};
