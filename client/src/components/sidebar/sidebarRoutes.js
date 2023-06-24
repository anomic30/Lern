import {
    PresentationChartBarIcon,
    CubeTransparentIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    ArrowLeftOnRectangleIcon,
    RectangleGroupIcon
} from "@heroicons/react/24/solid";


export const sidebarRoutes = [
    {
        path: '/app',
        name: 'Dashboard',
        icon: RectangleGroupIcon
    },
    {
        path: '/app/generate',
        name: 'Generate',
        icon: CubeTransparentIcon
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