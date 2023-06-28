import React from 'react'
import './Quizzes.scss'
import { Button, Card, Input, Chip, List, ListItem, ListItemSuffix, IconButton, } from '@material-tailwind/react';
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';


const Quizzes = () => {
    const navigate = useNavigate();
    const auth = useAuthStore(state => state.auth);
    const user = useUserStore(state => state.user);

    if (!auth) return <h1>Loading...</h1>

    return (
        <Card className="w-full p-2">
            <div className="flex flex-wrap h-screen">
                <div className="flex flex-col justify-between w-full lg:w-1/2 md:w-2/3 px-4 sm:px-8">
                    <h1 className="text-3xl md:text-3xl lg:text-5xl">Quizzes</h1>

                    <div className="overflow-y-auto max-h-[30rem]">
                        <List className="list-disc pl-8">
                            {user.quizzes.map((quiz, index) => (
                                <ListItem key={index} onClick={()=>navigate("/app/quiz/"+quiz.quizId)}>{ quiz.quizId }</ListItem>
                            ))}
                        </List>
                    </div>
                    <p className='pb-4'>This quiz is AI-generated and for entertainment purposes only.</p>
                </div>
                <div className="hidden w-full lg:w-1/2 md:w-1/3 md:block overflow-hidden quiz-img"></div>
            </div>
        </Card>
    )
}

export default Quizzes