import { useState, useEffect } from 'react';
import BlogList from './BlogList';
import SelectAuthorFilter from './SelectAuthorFilter';
import useFetch from './useFetch';

const Home = () => {
    const blogsLocation = "http://localhost:5000/blogs"
    const {data: blogs, isPending, error} = useFetch(blogsLocation);
    
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const authorArray = blogs
        ? Array.from(new Set(blogs.map((blog) => blog.author)))
        : [];

    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
    };

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
