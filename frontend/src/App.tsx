import { useState, useEffect } from 'react'

interface MembersResponse {
    members: string[];
}

function App() {
    const [data, setData] = useState<MembersResponse | null>(null);

    useEffect(() => {
        fetch("http://localhost:5000/members").then(
            res => res.json()
        ).then((data: MembersResponse) => {
            setData(data);
            console.log(data);
        })
        .catch(err => console.error("Fetch error: ", err))
  }, [])


    // Fetching data
    if (!data) {
        return <p>Loading...</p>
    }
    
    return (
        <div>
            {data.members.map((member, i) => (
                    <p key={i}>{member}</p>
            ))}
        </div>
    )
}

export default App
