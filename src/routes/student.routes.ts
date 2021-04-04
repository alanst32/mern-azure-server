import { Request, Response, Router } from 'express';
import { StudentInterface, StudentSearchRequestDto } from '../model/student.model';
import { 
    getStudents, 
    insertStudent, 
    updateStudent,
    deleteStudent
} from '../service/student.service';
import moment from 'moment';
const studentRouter = Router();

/**
 * POST: Get Students list
 */
studentRouter.post('/list', (req: Request<StudentSearchRequestDto>, res: Response) => {
    getStudents(req, res);
});

/**
 * POST: Insert Student
 */
studentRouter.post('/', (req: Request<StudentInterface>, res: Response) => {
    insertStudent(req, res);
});

/**
 * PUT: Update Student
 */
studentRouter.put('/', (req: Request<StudentInterface>, res: Response) => {
    if(req.body && req.body.dateOfBirth) {
        const dateMomentObject = moment(req.body.dateOfBirth, "DD/MM/YYYY"); 
        req.body.dateOfBirth = dateMomentObject.toISOString();
    }
    updateStudent(req, res);
});

/**
 * DELETE: Delete Student
 */
studentRouter.post('/inactive', (req: Request, res: Response) => {
    deleteStudent(req, res);
});

export default studentRouter; 