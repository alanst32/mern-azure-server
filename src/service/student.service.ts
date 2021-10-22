import Student, { StudentInterface, StudentSearchRequestDto } from '../model/student.model';
import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import mongoose from 'mongoose';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

/**
 * Search Students by name or skills
 * 
 * @param req 
 * @param res 
 */
async function getStudents(req: Request<StudentSearchRequestDto>, res: Response<Array<StudentInterface>>) {
    const query = Student.find();
    const filterQueryArray: Array<FilterQuery<StudentInterface>> = new Array<FilterQuery<StudentInterface>>();
    filterQueryArray.push({inactive: {$ne: true}});

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
        .then(students => {
            console.log('**** SUCCESS');
            return res.send(students);
        })
        .catch(err => {
            console.log(err);
        });; 
}

/**
 * Insert new Student
 * 
 * @param req 
 * @param res 
 */
async function insertStudent(req: Request<StudentInterface>, res: Response) {
    //req.body._id = new mongoose.Types.ObjectId();
    req.body._id = uuidv4();
    console.log(`_ID: ${req.body._id}`);
    await Student
        .create(
            {
                _id: req.body._id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                country: req.body.country,
                skills: req.body.skills
            }
        )
        .then(student => {
            return res.status(200).send();
        })
        .catch(err => {
            console.log(err);
        });
}

/**
 * Update Student data
 * 
 * @param req 
 * @param res 
 */
async function updateStudent(req: Request<StudentInterface>, res: Response) {
    console.log(req.body);

    if (!req.body && !req.body._id) {
        res.status(400).send();
        return;
    }

    await Student
        .updateOne(
            {_id: { $in: req.body._id}},
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                country: req.body.country,
                skills: req.body.skills
            },
            {upsert: false}
        )
        .then(student => {
            return res.status(200).send();
        })
        .catch(err => console.log(err));
}

/**
 * Delete Student data
 * 
 * @param req 
 * @param res 
 */
async function deleteStudent(req: Request<any>, res: Response) {
    if (!req.body && !req.body.ids) {
        res.status(400).send();
        return;
    }

    console.log(req.body);

    await Student
        .updateMany(
            {_id: { $in: req.body.ids}},
            {
                inactive: true
            },
            {upsert: false}
        )
        .then(student => {
            return res.status(200).send();
        })
        .catch(err => console.log(err));
}

export {
    getStudents,
    insertStudent,
    updateStudent,
    deleteStudent
};
