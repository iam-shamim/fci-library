import React from 'react';
import { Link } from 'react-router-dom';
export default ({sl, book, bookReturn})=>(
    <tr>
        <th scope="row">{sl}</th>
        <td><Link to={'/books/'+book.book_id._id+'/view'}>{book.book_id.name}</Link></td>
        <td>
            <button onClick={()=>bookReturn(book._id)} className="btn btn-success"><i className="fa fa-check-circle-o" aria-hidden="true"></i> Return</button>
        </td>
    </tr>
);

