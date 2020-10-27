import React, {useState, useEffect} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import './index.css';
import { defaultUser } from '../../../components/defaultUser';

export default function Edit() {

    const {...dUser} = defaultUser;
    const [user, setUser] = useState(dUser)
    const [redirect, setRedirect] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setUser(json);
        }).catch((error) => alert(`Erro ${error}`))
    }, [id])

    // const handleInputChange = (event) => {
    //     const auxValues = { ...user };
    //     auxValues[event.target.name] = event.target.value;
    //     setUser(auxValues);
    // }
    
    const handleInputChange = (event) => {
        setUser(prevUser =>({
            ...prevUser,   
            [event.target.name]: event.target.value,
        }));
    }

    const handleInputAddressChange = (event) => {
        setUser(prevUser =>({
            ...prevUser,   
            address:{
                ...prevUser.address,
                [event.target.name]: event.target.value,
            },
        }));
    }
    const handleInputGeoChange = event => {
        setUser(prevUser =>({
            ...prevUser,   
            address:{
                ...prevUser.address,
                geo: {
                    ...prevUser.address.geo,
                    [event.target.name]: event.target.value,
                }
            },
        }));
    }

    const handleInputCompanyChange = (event) => {
        setUser(prevUser =>({
            ...prevUser,   
            company: {
                ...prevUser.company,
                [event.target.name]: event.target.value
            },
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        putUser();
    }

    const putUser = () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {'Content-type': 'application/json; charset=UTF=8'},
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            alert('User updated with success')
            setRedirect(true)
        })
        .catch((error) => `Error ${error}`)
    }
  
    if(redirect) {
        return <Redirect to='/users'>Back</Redirect>
    }else {
        return (
            <div className='user-edit'>
                <form onSubmit={handleSubmit}> 
                    <label>Name:</label>
                    <input type='text' id='name' name='name' value={user.name} 
                    placeholder='Name' onChange={handleInputChange} required maxLength='50' minLength='3'/>
                    <br/>
                    <label>Username:</label>
                    <input type='text' id='username' name='username' value={user.username} 
                    placeholder='Username' onChange={handleInputChange} required maxLength='50' minLength='3'/>
                    <br/>
                    <label>Email:</label>
                    <input type='email' id='email' name='email' value={user.email} 
                    placeholder='Email' onChange={handleInputChange} required/>
                    <br/>
                    <label>Phone:</label>
                    <input type='text' id='phone' name='phone' value={user.phone}
                    placeholder='Phone number' onChange={handleInputChange} required/>
                    <br/>
                    <label>Website:</label> 
                    <input type='text' id='website' name='website' value={user.website}
                    placeholder='Website' onChange={handleInputChange} /> 
                    <br/>
                    <label>City:</label>
                     <input type='text' id='city' name='city' value={user['address'].city}
                    placeholder='City' onChange={handleInputAddressChange} />
                    <br/>
                    <label>Street:</label>
                    <input type='text' id='street' name='street' value={user['address'].street} 
                    placeholder='Street' onChange={handleInputAddressChange}/>
                    <br/>
                    <label>Latitude:</label>
                    <input type='number' id='lat' name='lat' value={user['address']['geo'].lat}
                    placeholder='Latitude' onChange={handleInputGeoChange} />
                    <label>Longitude:</label>
                    <input type='number' id='lng' name='lng' value={user['address']['geo'].lng} 
                    placeholder='Longitude' onChange={handleInputGeoChange}/>
                    <br/>
                    <label>Suite:</label>
                    <input type='text' id='suite' name='suite' value={user['address'].suite}
                    placeholder='Suite' onChange={handleInputAddressChange}/>
                    <label>Zipcode:</label>
                    <input type='text' id='zipcode' name='zipcode' value={user['address'].zipcode} 
                    placeholder='Zipcode' onChange={handleInputAddressChange}/>  
                    <br/>
                    <label>Nome:</label>
                    <input type='text' id='companyName' name='name' value={user['company'].name} 
                    placeholder='Company name' onChange={handleInputCompanyChange}/>
                     <br/>
                    <label>BS:</label>
                    <input type='text' id='bs' name='bs' value={user['company'].bs}
                    placeholder='BS' onChange={handleInputCompanyChange}/>
                     <br/>
                    <label> CatchPhrase:</label>
                    <input type='text' id='catchPhrase' name='catchPhrase' value={user['company'].catchPhrase}
                    placeholder='Catchphrase' onChange={handleInputCompanyChange}/>
                    <br/>
                    <button type='submit'>Submit</button>
                    <br/>
                </form>
            </div>
        )
    }
}
