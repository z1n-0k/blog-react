import { useState, useEffect } from 'react'
import BlogList from './BlogList';
import SelectAuthorFilter from './SelectAuthorFilter';

const Home = () => {

    const [blogs, setBlogs] = useState(null)

    const authorArray = blogs ? Array.from(
        new Set(blogs.map((blog) => blog.author))
    ) : [];

    const [selectedAuthor, setSelectedAuthor] = useState("");
    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
    }

    useEffect(() => {
        fetch("http://localhost:5000/blogs").then(res => {
            return res.json();
        }).then((data) => {
            setBlogs(data);

        })
    }, [])

    return (
        <div className="home">
            {authorArray && <SelectAuthorFilter authorArray = {authorArray} selectedAuthor = {selectedAuthor} handleAuthorChange = {handleAuthorChange}/>}
            {blogs && <BlogList blogs={selectedAuthor ? blogs.filter((blog) => blog.author === selectedAuthor) : blogs}  title={selectedAuthor ? `${selectedAuthor}'s Blogs!` : "All Blogs"}/>}
        </div>
     );
}

export default Home;