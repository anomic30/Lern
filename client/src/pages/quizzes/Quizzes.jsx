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
        <Card className="w-full p-2 max-h-screen" id="resp-con">
            <div className="flex flex-wrap h-screen">
                <div className="relative w-full lg:w-1/2 md:w-2/3 px-4 sm:px-8">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl">Quizzes</h1>
                    <p className="text-md md:text-1xl lg:text-2xl mt-2 mb-8">View your quizzes here!</p>
                    <div className="mt-8 w-full py-4 md:pr-2 flex flex-wrap gap-2 justify-start overflow-y-auto quizzes-con h-full">
                        <List className="list-disc md:pl-8 w-full">
                            {user?.quizzes?.map((quiz, index) => (
                                <ListItem key={index} onClick={()=>navigate("/app/quiz/"+quiz.quizId)} className='text-xl py-2 px-2 sm:py-4 sm:px-4 h-min-16 bg-dteal hover:bg-dhteal hover:text-black'>{quiz.title}</ListItem>
                            ))}
                            { user?.quizzes?.length === 0 && <p className="text-xl justify-self-center content-center">No quizzes found!</p>}
                        </List>
                    </div>
                </div>
                <div className="hidden w-full lg:w-1/2 md:w-1/3 md:block overflow-hidden quiz-img"></div>
            </div>
        </Card>
    )
}

export default Quizzes