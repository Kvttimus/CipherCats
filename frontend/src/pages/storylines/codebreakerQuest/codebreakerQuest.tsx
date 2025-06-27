import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const CodebreakerQuest = () => {
    return (
        <div>
            <h1>CodebreakerQuest</h1>  
            <p>
                <Link to="/home/codebreakerQuest/lab1">Lab 1: The Forgotten Shift</Link>
                <p>Decode a basic Caesar cipher using brute-force or shift analysis</p>
            </p>
            <p>
                <Link to="/home/codebreakerQuest/lab2">Lab 2: Twin V's Secret</Link>
                <p>Crack a Vigenere Cipher with a known key length</p>
            </p>
            <p>
                <Link to="/home/codebreakerQuest/lab3">Lab 3: Modular Minds</Link>
                <p>Break an affine cipher using modular inverses</p>
            </p>
            <p>
                <Link to="/home/codebreakerQuest/lab4">Lab 4: The Frequency Trap</Link>
                <p>Given a ciphertext with unknown method, deduce the cipher using frequency analysis</p>
            </p>
            <p>
                <Link to="/home/codebreakerQuest/lab5">BOSS LAB: The Great Decryption</Link>
                <p>Combine the concepts/ciphers and techniques learned in the previous labs</p>
            </p>
        </div>
    )
}

export default CodebreakerQuest;