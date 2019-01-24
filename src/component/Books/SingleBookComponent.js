import React from 'react';
export default ({book,filterWithCategory,filterWithLanguage})=>(
    <React.Fragment>
        <div>
            <i className="fa fa-book"></i> {book.name}
        </div>
        <div>
            <span><i className="fa fa-pencil"></i> {book.writer}</span>
            <span className="ma-l-20"><i className="fa fa-print"></i> {book.publisher}</span>
            <span className="ma-l-20 pointer" onClick={()=>filterWithLanguage(book.language._id)}><i className="fa fa-language"></i> {book.language.name}</span>
            <span className="ma-l-20"><i className="fa fa-database" aria-hidden="true"></i> Total: {book.items}</span>
            <span className="ma-l-20"><i className="fa fa-database" aria-hidden="true"></i> Stock: {book.current_stock}</span>
        </div>
        <p>{book.details}</p>
        <div>
            { book.categories.map(cat=> <button onClick={()=>filterWithCategory(cat._id)} className="btn btn-xs btn-default ma-r-5" key={cat._id}>{cat.name}</button>) }
        </div>
    </React.Fragment>
)