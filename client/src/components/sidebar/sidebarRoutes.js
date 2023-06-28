import {
    CubeTransparentIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    ArrowLeftOnRectangleIcon,
    RectangleGroupIcon,
    BookOpenIcon,
    PuzzlePieceIcon,
    Squares2X2Icon,
    PresentationChartBarIcon
} from "@heroicons/react/24/outline";

export const sidebarRoutes = [
    {
        path: '/app',
        name: 'Dashboard',
        icon: Squares2X2Icon
    },
    {
        path: '/app/generate',
        name: 'Generate',
        icon: CubeTransparentIcon
    },
    {
        path: '/app/courses',
        name: 'Courses',
        icon: BookOpenIcon
    },
    {
        path: '/app/quizzes',
        name: 'Quizzes',
        icon: PuzzlePieceIcon
    },
    {
        path: '/app/insights',
        name: 'Insights',
        icon: PresentationChartBarIcon
    },
]

// {
//     path: '/app/courses',
//     name: 'My Courses',
//     // icon: my_codes
// },
// {
//     path: '/app/quiz',
//     name: 'Quiz',
//     // icon: credit_store
// },
// {
//     path: '/app/stats',
//     name: 'Stats',
//     // icon: credit_store
// },