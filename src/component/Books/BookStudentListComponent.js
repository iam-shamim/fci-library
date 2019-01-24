import React from 'react';
import {Link} from "react-router-dom";
export default ({sl, student, bookReturn})=>(
    <tr>
        <th scope="row">{sl}</th>
        <td><Link to={'/students/'+student.student_id._id+'/view'}>{student.student_id.name}</Link></td>
        <td>
            <button onClick={()=>bookReturn(student._id)} className="btn btn-success"><i className="fa fa-check-circle-o" aria-hidden="true"></i> Return</button>
        </td>
    </tr>
);
