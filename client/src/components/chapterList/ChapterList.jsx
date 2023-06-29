import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { IconButton, List, ListItem, ListItemPrefix, ListItemSuffix, Checkbox, Progress ,Typography} from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ChapterList = ({ course }) => {
    const navigate = useNavigate();
    return (
        <div className='mt-10 grow'>
            <div className="w-full mb-10">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <Typography color="blue" variant="h6">Completed</Typography>
                    <Typography color="blue" variant="h6">69%</Typography>
                </div>
                <Progress value={69} />
            </div>
            <div className="mt-6"></div>
            <List>
                {course?.chapters.map((chapter, index) => {
                    return (
                        <ListItem ripple={false} className="py-1 pr-1 pl-4" key={index} >
                            <ListItemPrefix className='z-100'>
                                <Checkbox
                                    defaultChecked={chapter.completed}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0"
                                    }} />
                            </ListItemPrefix>
                            <div className="w-full" onClick={() => navigate("chapter/" + chapter._id)}>
                                {chapter.title}
                            </div>

                            <ListItemSuffix>
                                <IconButton variant="text" color="blue-gray">
                                    <ChevronRightIcon className="h-5 w-5" />
                                </IconButton>
                            </ListItemSuffix>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}

export default ChapterList