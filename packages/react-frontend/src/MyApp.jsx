import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  return (
    <div className="container">
      <Table 
	characterData={characters}
	removeCharacter={removeOneCharacter}
	/>
	<Form handleSubmit={updateList} />
    </div>
  );

useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => {
      console.log(error);
    });
}, []);

function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(person)
  });

  return promise;
}

function removeOneCharacter(index) {
  const id = characters[index].id;
  const url = `http://localhost:8000/users/${id}`;
  fetch(url, { method: 'DELETE' })
    .then((response) => {
      if (response.ok) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      } else {
        console.error('Error deleting user:', response.status);
      }
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
}


function updateList(person) {
  postUser(person)
    .then(response => response.json())
    .then(() => setCharacters([...characters, person]))
    .catch((error) => {
      console.log(error);
    });
}

function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

}

export default MyApp;
