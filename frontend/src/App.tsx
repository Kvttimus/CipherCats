import { useState, useEffect } from 'react'
import Signup from './pages/Signup';
import axios from 'axios';

interface MembersResponse {
    members: string[];
}

function App() {
    const [array, setArray] = useState([]);

    const fetchAPI = async() => {
        const response = await axios.get("http://127.0.0.1:8080/api/users");
        console.log(response.data.users);
        setArray(response.data.users);
    }

    useEffect(() => {
        fetchAPI();
    }, []);


    // Displays data from the backend (main.py)
    return (
        <div>
            {
                array.map((user, index) => (
                    <div key={index}>
                        <span>{user}</span>
                        <br></br>
                    </div>
                ))
            }
            <>
                <Signup />
            </>
        </div>
    )
}

export default App
