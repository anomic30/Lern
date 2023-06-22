import React, { useState } from 'react'
import './Generate.scss'
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import Axios from 'axios';
import Cookies from 'js-cookie';
import ReactMarkdown from 'react-markdown'

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Generate = () => {
    const auth = useAuthStore(state => state.auth);
    const user = useUserStore(state => state.user);
    const [topicName, setTopicName] = useState('');

    const handleTopicGeneration = async() => {
        console.log("Generating topic...");
        try {
            const genResp = await Axios.post(APP_SERVER + "/api/user/generateCourse", { topic: topicName }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            console.log(genResp);
        } catch (error) {
            console.log(error);
        }
    }

    if(!auth) return <h1>Loading...</h1>
    return (
        <div>
            <h1>What do you want to learn?</h1>
            <input type="text" placeholder='Topic' onChange={(e) => setTopicName(e.target.value)} />
            {/* <ReactMarkdown>{content}</ReactMarkdown> */}
            
        </div>
    )
}

export default Generate