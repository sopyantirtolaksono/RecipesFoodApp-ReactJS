import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from "styled-components";

export default function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [dataSearch, setDataSearch] = useState("");

    let params = useParams();

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);

        if(recipes.results.length < 1) {
            setDataSearch("false");
        } else {
            setDataSearch("true");
        }
    }

    return (
        <Grid>
            {dataSearch === "true" && (
                searchedRecipes.map((item) => {
                    return (
                        <Card key={item.id}>
                            <Link to={"/recipe/" + item.id}>
                                <img src={item.image} alt="" />
                                <h4>{item.title}</h4>
                            </Link>
                        </Card>
                    )
                })
            )}
            {dataSearch === "false" && (
                <NotFound>
                    <h3>Oops! Data is not found.</h3>
                </NotFound>
            )}
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }

    a {
        text-decoration: none;
    }

    h4 {
        text-align: center;
        padding: 1rem;
    }
`;

const NotFound = styled.div`
    text-align: center;
    
    h3 {
        color: grey;
        font-size: 40px;
        font-weight: 500;
        margin-top: 300px;
    }
`;