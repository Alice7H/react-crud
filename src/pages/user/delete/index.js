import React, {useState, useEffect} from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import './index.css';

export default function Delete() {

    const [user, setUser] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const { id } = useParams();

    useEffect(() => {
       fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
       .then((response) => response.json())
       .then((json) => {
           console.log(json);
            setUser(json);
       })
       .catch((error) => alert(`Error ${error}`))
       
    }, [id])

    const handleClick = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
        }).then((response) => response.json())
        .then((json) => {
            console.log(json);
            alert('User deleted with success!!')
        })
        .catch((error) => alert(`Error ${error}`))

        setRedirect(true);
    }

    if(redirect)
    {
        return <Redirect to='/'/>
    }else {  
        return (
            <fieldset>
                <legend>Delete user</legend>
                <div className='user-delete'>
                    <label htmlFor='name'>{user.name}</label>
                    <p>Are you sure that you want to delete this user?</p>
                    <button onClick={handleClick}>Remove</button>
                    <br/><br/>
                    <button><Link to={`/`}>Back</Link></button>
                </div>
            </fieldset>
        )
    }
}
