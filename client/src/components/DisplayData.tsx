import React, { useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      username
      age
      friends {
        name
      }
    }
    nationalities
  }
`;
const QUERY_MOVIE_BY_NAME = gql`
  query GetMovieByName($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      username
    }
  }
`;

export default function DisplayData() {
  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const [fetchMovie, { data: movieData, error }] =
    useLazyQuery(QUERY_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [movieSearched, setMovieSearched] = useState("");

  // Create User States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");
  const [nationalities, setNationalities] = useState([]);

  useEffect(() => {
    if (!data) return;
    if (data.nationalities.length) {
      setNationalities(data.nationalities);
    }
  }, [data]);

  if (loading) return <h1>Loading</h1>;

  return (
    <div>
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(+event.target.value);
          }}
        />
        <select
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        >
          {nationalities.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });
            refetch();
          }}
        >
          Create User
        </button>
      </div>
      {data.users.map((user: any) => {
        return <div key={user.id}>{user.username}</div>;
      })}
      <div style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="enter movie"
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button
          onClick={(e) => {
            fetchMovie({ variables: { name: movieSearched } });
          }}
        >
          enter movie
        </button>
        <div>
          {movieData ? (
            <>
              <p>name: {movieData.movie.name}</p>
              <p>yearOfPublication: {movieData.movie.yearOfPublication}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
