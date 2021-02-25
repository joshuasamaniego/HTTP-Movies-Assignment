import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from "axios";


const initialFormValues = {
    title: "",
    director: "",
    metascore: "",
    stars: []
};

function AddMovie(props) {
    const [form, setForm] = useState(initialFormValues);
    const { push } = useHistory();

    const handleChange = ev => {
        setForm({
            ...form,
            [ev.target.name]: ev.target.value
        })
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const properForm = { ...form, stars: form.stars.split(',') }
        console.log(properForm);
        axios.post('http://localhost:5000/api/movies/', properForm)
            .then(res => {
                props.setMovieList(res.data);
                props.getMovieList();
                push('/');
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
                    placeholder="Stars"
                    value={form.stars}
                />
            </label>
            <button type='submit'>Add Movie</button>
        </form>
    )
}

export default AddMovie
