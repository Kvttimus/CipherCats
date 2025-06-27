import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Play = () => {
    return (
        <div>
            <h1>Menu</h1>  
            <div>
                <p>
                    <Link to="/home/codebreakerQuest">Codebreaker Quest</Link>
                    <p>Difficulty: Easy</p>
                </p>
            </div> 
        </div>
    )
}

export default Play;