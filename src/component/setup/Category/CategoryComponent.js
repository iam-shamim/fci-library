import React from 'react';
import classNames from 'classnames';

export default ({sl, name, _id, editCategory, deleteCategory, editing_id}) => (
    <tr>
        <td>{sl}</td>
        <td>{ name }</td>
        <td>
            <button className="delete-area" onClick={()=>deleteCategory(_id)}>
                <i className="fa fa-pencil" aria-hidden="true"></i> delete
            </button>
            <button  onClick={()=>editCategory(_id)} className={classNames('ma-r-5','edit-area',{'editing-area':editing_id ===_id})}>
                <i className="fa fa-pencil" aria-hidden="true"></i> { editing_id ===_id? 'editing..': 'edit'}
            </button>
        </td>
    </tr>
)