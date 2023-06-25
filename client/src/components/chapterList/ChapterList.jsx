import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { IconButton, List, ListItem, ListItemSuffix } from '@material-tailwind/react'
import React from 'react'

const ChapterList = ({course}) => {
    return (
        <div className='mt-20 grow'>
            <h3 className='md:text-xl xl:text-2xl font-medium text-black'>{course?.title}</h3>
            <div className="mt-6"></div>

            <List>
                {course?.chapters.map((chapter, index) => {
                    return (
                        <ListItem ripple={false} className="py-1 pr-1 pl-4" key={index}>
                            {chapter.title}
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