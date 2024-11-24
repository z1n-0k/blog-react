const SelectAuthorFilter = ({authorArray, selectedAuthor, handleAuthorChange}) => {
    return (
        <div id = "blog-modifiers"> 
                <label htmlFor="author-select" id="author-select-label">Choose an author:</label>
                <select name="author" id="author-select" value={selectedAuthor} onChange={handleAuthorChange}>    
                <option className= "author-select-option" value="">All Authors</option>
                    {
                        authorArray.map((author,index) => (
                            <option  className= "author-select-option" key={index} value={author}>
                                {author}
                            </option>
                        ))
                    }
        </select></div>
      );
}
 
export default SelectAuthorFilter;