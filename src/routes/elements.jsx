
import { Suspense, lazy, useContext } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';

const Loadable = (Component) => (props) =>
    (
        <Suspense
            fallback={
                <LoadingScreen />
            }
        >
            <Component {...props} />
        </Suspense>
    );

// layouts
export const DashBoardLayout = Loadable(
    lazy(() => import('src/layouts/dashboard/DashboardLayout.jsx'))
);

// analytics
export const ProjectAnalytics = Loadable(
    lazy(() => import('src/pages/dashboard/analytics/projects.jsx'))
);

export const UserAnalytics = Loadable(lazy(() => import('src/pages/dashboard/analytics/user.jsx')));

// dashboard - departments
export const DepartmentCreate = Loadable(
    lazy(() => import('src/pages/dashboard/departments/create.jsx'))
);

export const DepartmentDetails = Loadable(
    lazy(() => import('src/pages/dashboard/departments/details.jsx'))
);
export const DepartmentList = Loadable(
    lazy(() => import('src/pages/dashboard/departments/list.jsx'))
);

// dashboard-projects
export const ProjectCreate = Loadable(lazy(() => import('src/pages/dashboard/project/create.jsx')));

export const ProjectDetails = Loadable(
    lazy(() => import('src/pages/dashboard/project/details.jsx'))
);
export const ProjectLists = Loadable(lazy(() => import('src/pages/dashboard/project/lists.jsx')));

// dashboard-teams
export const TeamsCreate = Loadable(lazy(() => import('src/pages/dashboard/teams/create.jsx')));

export const TeamsDetails = Loadable(lazy(() => import('src/pages/dashboard/teams/details.jsx')));
export const TeamsLists = Loadable(lazy(() => import('src/pages/dashboard/teams/lists.jsx')));

// dashboard-users
export const UsersCreate = Loadable(lazy(() => import('src/pages/dashboard/users/create.jsx')));

export const UsersLists = Loadable(lazy(() => import('src/pages/dashboard/users/list.jsx')));

// dashboard-communication
export const UserChatting = Loadable(
    lazy(() => import('src/pages/dashboard/communication/chat.jsx'))
);

// dashboard-tasks
export const TasksList = Loadable(lazy(() => import('src/pages/dashboard/tasks/list.jsx')));

// authentication
export const LoginPage = Loadable(lazy(() => import('src/pages/authentication/LoginPage.jsx')));

export const RegisterPage = Loadable(
    lazy(() => import('src/pages/authentication/RegisterPage.jsx'))
);

export const VerifyCode = Loadable(
    lazy(() => import('src/pages/authentication/VerifyCodePage.jsx'))
);

// extras
export const AboutPage = Loadable(lazy(() => import('src/pages/extras/AboutPage.jsx')));

export const ComingSoonPage = Loadable(lazy(() => import('src/pages/extras/ComingSoon.jsx')));
export const ContactPage = Loadable(lazy(() => import('src/pages/extras/ContactPage.jsx')));
export const MaintenancePage = Loadable(lazy(() => import('src/pages/extras/MaintenancePage.jsx')));
export const Page403 = Loadable(lazy(() => import('src/pages/extras/Page403.jsx')));
export const Page404 = Loadable(lazy(() => import('src/pages/extras/Page404.jsx')));
export const Page500 = Loadable(lazy(() => import('src/pages/extras/Page500.jsx')));
