import React from 'react';
import StudentListSingleComponent from "./StudentListSingleComponent";
export default ({student, filterWithCategory, editStudent, viewStudent, deleteStudent})=>(
    <div>
        {<StudentListSingleComponent student={student} />}
        <div>
            <button className="btn btn-xs btn-primary ma-r-5" onClick={()=>editStudent(student._id)}><i className="fa fa-pencil"> <span className="ma-l-5">Edit</span></i></button>
            <button className="btn btn-xs btn-danger ma-r-5" onClick={()=>deleteStudent(student._id)}><i className="fa fa-trash-o"> <span className="ma-l-5">Delete</span></i></button>
            <button className="btn btn-xs btn-success" onClick={()=>viewStudent(student._id)}><i className="fa fa-eye"> <span className="ma-l-5">View</span></i></button>
        </div>
        <hr/>
    </div>
);

