import React from 'react';
export default ({student})=>(
    <div>
        <div><strong>Name: </strong> {student.name}</div>
        <div>
            <span className="ma-r-20"><strong>Father's Name: </strong>  {student.father_name}</span>
            <span className="ma-r-20">Department: {student.department.name}</span>
            <span className="ma-r-20">Shift: {student.shift.name}</span>
            <span className="ma-r-20">Year: {student.year.name}</span>
            <span>Registration: {student.registration}</span>
        </div>
    </div>
);

