import React, {useState, useRef, useCallback}from 'react';

import './App.css';
import useBookSearch from './useBookSearch';

function App() {
  const [query, serQuery] = useState('')
  const [pageNumber, setPageNumber] = useState('')
  
  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber)


  const observer = useRef()
  const lastBookElement = useCallback(node => {
    if(loading)return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber+1)
        
      }
    })
    if(node) observer.current.observe(node)
  }, [loading, hasMore]) 

  function handleSearch(e){
    serQuery(e.target.value)
    setPageNumber(1)
  }

 
  return (
    <div >
      <input type='text' value={query} onChange={handleSearch}></input>
      {books.map((book, index) => {
        if(books.length === index+1){
        return <div ref={lastBookElement} key={book}>{book}</div>
      } else {
      return <div  key={book}>{book}</div>
      }
      })}
      <div>{loading && 'loading...'}</div>
      <div>{error && 'error...'}</div>
     
    </div>
  );
}

export default App;
