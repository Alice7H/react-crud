import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.css';
import {defaultUser } from '../../../components/defaultUser';

export default function Details() {
 
    const [user, setUser] = useState(defaultUser)
    const { id } = useParams();

    useEffect(() => {
       function getUser() {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => response.json())
        .then((jsonUser) => setUser(jsonUser))
        .catch((error) => alert(`Error ${error}.`))
       }

       getUser()
    }, [id])

    return (
        <div className='user-info'>
            <h2> {user.name}</h2>
            <p>Username: {user.username} </p>
            <p>Site: {user.website}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <h3>Address</h3>
            <p>{user.address.city} - {user.address.street} Street, {user.address.suite}</p>
            <p>Zipcode: {user.address.zipcode}</p>
            <p>Lat:  {user.address.geo.lat} - Long: {user.address.geo.lng} </p>
            <h3>Company informations</h3>
            <p>Name: {user.company.name}</p>
            <p>Catchphrase: {user.company.catchPhrase}</p>
            <p>BS: {user.company.bs}</p>
            <br/>
            <Link to={`/`}>Back</Link>
            <Link to={`/edit-user/${id}`}>Edit</Link>
            <Link to={`/delete-user/${id}`}>Delete</Link>
        </div>
    )
}
