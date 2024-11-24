import { useState, useEffect } from 'react';
import BlogList from './BlogList';
import SelectAuthorFilter from './SelectAuthorFilter';

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const blogsLocation = "http://localhost:5000/blogs"

    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
    };

    const authorArray = blogs
        ? Array.from(new Set(blogs.map((blog) => blog.author)))
        : [];

    useEffect(() => {
        fetch(blogsLocation)
            .then((res) => {
                if(!res.ok){
                    throw Error("Couldnt Fetch data from: " + blogsLocation)
                }
                return res.json();
            })
            .then((data) =>{ 
                setBlogs(data);
                setIsPending(false);
                setError(null)
            })
            .catch((error) => {
                setError(error.message);
                setIsPending(false);
            });
    }, []);



    return (
        <div className="home">
            {error && ( <div>{ error }</div> )}
            {isPending && <div>Loading ...</div>}
            {blogs  && (
                <SelectAuthorFilter
                    authorArray={authorArray}
                    selectedAuthor={selectedAuthor}
                    handleAuthorChange={handleAuthorChange}
                />
            )}
            {blogs && (
                <BlogList
                    blogs={
                        selectedAuthor
                            ? blogs.filter((blog) => blog.author === selectedAuthor)
                            : blogs
                    }
                    title={
                        selectedAuthor
                            ? `${selectedAuthor}'s Blogs!`
                            : "All Blogs"
                    }
                />
            )}
        </div>
    );
};

export default Home;
