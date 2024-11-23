import { useState } from 'react'
import BlogList from './BlogList';

const Home = () => {

    const [blogs, setBlogs] = useState([
        {title: "My new website", body: "lorem ipsum ...", author: 'Mario', id:0},
        {title: "Welcome Party!", body: "lorem ipsum ...", author: 'Yoshi', id:1},
        {title: "Web Dev tool tips", body: "lorem ipsum ...", author: 'Mario', id:2}
    ])

    const authorArray = Array.from(
        new Set(blogs.map((blog) => blog.author))
      );

    const [selectedAuthor, setSelectedAuthor] = useState("");
    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
    }

    return (
        <div className="home">
            <div id = "author-select-div"> 
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
            <BlogList blogs={selectedAuthor ? blogs.filter((blog) => blog.author === selectedAuthor) : blogs}  title={selectedAuthor ? `${selectedAuthor}'s Blogs!` : "All Blogs"}/>
        </div>
     );
}

export default Home;