import { useState, useEffect } from 'react'
import BlogList from './BlogList';

const Home = () => {

    const [blogs, setBlogs] = useState(null)

    const authorArray = Array.from(
        new Set(blogs.map((blog) => blog.author))
      );

    const [selectedAuthor, setSelectedAuthor] = useState("");
    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
    }

    useEffect(() => {
        fetch("some address").then(res => {
            return res.json();
        }).then((data) => {
            setBlogs(data);
        })
    }, [])

    return (
        <div className="home">
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
            {blogs && <BlogList blogs={selectedAuthor ? blogs.filter((blog) => blog.author === selectedAuthor) : blogs}  title={selectedAuthor ? `${selectedAuthor}'s Blogs!` : "All Blogs"}/>}
        </div>
     );
}

export default Home;