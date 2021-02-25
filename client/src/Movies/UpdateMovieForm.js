import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';


const initialFormValues = {
    title: "",
    director: "",
    metascore: "",
    stars: "",
};
function UpdateMovieForm(props) {
    const [form, setForm] = useState(initialFormValues);

    const { id } = useParams();
    const { push } = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res.data);
            setForm(res.data);
        })
        .catch(err => {
            console.log(err);
        })
      }, []);

    const handleChange = ev => {
        setForm({
            ...form,
            [ev.target.name]: ev.target.value
        })
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, form)
            .then(res => {
                console.log(res);
                console.log(props);
                const updatedMovies = [...props.movies, res.data]
                // console.log(updatedMovies);
                // const new = props.movies.filter(() => (props.movies.id !== res.data.id))
                // // map 
                // // if movie.id == res.data.id
                props.setMovieList(updatedMovies);
                props.getMovieList();
                push(`/movies/${id}`);

            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Movie Title:
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Movie Title"
                    value={form.title}
                />
            </label>
            <label>Director:
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="Director"
                    value={form.director}
                />
            </label>
            <label>Metascore:
                <input
                    type="text"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="Metascore"
                    value={form.metascore}
                />
            </label>
            <label>Stars:
                <input
                    type="text"
                    name="stars"
                    onChange={handleChange}
                    placeholder="Metascore"
                    value={form.stars}
                />
            </label>
            <button type='submit'>Submit Changes</button>
        </form>
    )
}

export default UpdateMovieForm
