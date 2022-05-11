import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default function Main() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        function getUsers() {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then( (response) => response.json())
            .then( (json) => setUsers(json))
            .catch((error) => alert(`Error ${error}`))
        }

        getUsers()
    }, [])

    return (
        <div className='user-list'>
        { users.map(user =>  
            <div key={user.id}>
                <article>
                    <h3> Welcome {user.username} </h3>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p><Link to={`/users/${user.id}`}>Details</Link></p>
                    <br/>
                </article>
            </div>      
        )}
        </div>
    )
}
