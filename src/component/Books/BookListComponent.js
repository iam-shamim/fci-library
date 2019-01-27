import React from 'react';
import SingleBookComponent from './SingleBookComponent';
export default ({book, filterWithCategory,filterWithLanguage, editBook, deleteBook, giveToBook, viewBook})=>(
  <div>
      <SingleBookComponent book={book} filterWithCategory={filterWithCategory} filterWithLanguage={filterWithLanguage} />
      <div>
          <button className="btn btn-xs btn-primary ma-r-5" onClick={()=>editBook(book._id)}><i className="fa fa-pencil"> <span className="ma-l-5">Edit</span></i></button>
          <button className="btn btn-xs btn-danger ma-r-5" onClick={()=>deleteBook(book._id)}><i className="fa fa-trash-o"> <span className="ma-l-5">Delete</span></i></button>
          <button className="btn btn-xs btn-success ma-r-5" onClick={()=>viewBook(book._id)}><i className="fa fa-eye"> <span className="ma-l-5">View</span></i></button>
          {
              book.current_stock > 0 && (
                  <button className="btn btn-xs btn-success" onClick={()=>giveToBook(book._id)}>
                      <span className="glyphicon glyphicon-plus-sign"></span> Give To
                  </button>
              )
          }
      </div>
      <hr/>
  </div>
);

