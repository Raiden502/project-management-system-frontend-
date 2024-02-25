import { useMemo } from 'react';
import { paths } from 'src/routes/path';
import Iconify from 'src/components/iconify/Iconify';

const icon = (name) => <Iconify icon={name} />;

const ICONS = {
    chat: icon('ph:chats-circle-duotone'),
    user: icon('ph:user-duotone'),
    file: icon('ph:files-duotone'),
    task: icon('fluent:task-list-ltr-24-filled'),
    project: icon('ph:kanban-duotone'),
    calendar: icon('uil:calender'),
    disabled: icon('lets-icons:user-alt-duotone'),
    analytics: icon('majesticons:analytics-line'),
    task_analytics: icon('grommet-icons:analytics'),
    dep_analytics: icon('ion:analytics-sharp'),
    teams: icon('fluent:people-team-24-regular'),
};

export function useNavData() {
    const data = useMemo(() => [
        {
            subheader: 'overview',
            items: [
                {
                    title: 'department analytics',
                    path: paths.dashboard.root,
                    icon: ICONS.dep_analytics,
                },
                {
                    title: 'Project analytics',
                    path: paths.dashboard.root,
                    icon: ICONS.task_analytics,
                },
            ],
        },

        // MANAGEMENT
        // ----------------------------------------------------------------------
        {
            subheader: 'management',
            items: [
                // USER
                {
                    title: 'user',
                    path: paths.dashboard.users.list,
                    icon: ICONS.user,
                    children: [
                        {
                            title: 'Performance',
                            path: paths.dashboard.communication.chat,
                        },
                        { title: 'list', path: paths.dashboard.users.list },
                        { title: 'create', path: paths.dashboard.users.create },
                    ],
                },
            ],
        },
        {
            subheader: 'projects',
            items: [
                // USER
                {
                    title: 'Departments',
                    path: paths.dashboard.departments.list,
                    icon: ICONS.project,
                    children: [
                        { title: 'list', path: paths.dashboard.departments.list },
                        { title: 'details', path: paths.dashboard.departments.details },
                        { title: 'create', path: paths.dashboard.departments.create },
                    ],
                },
                {
                    title: 'project',
                    path: paths.dashboard.projects.list,
                    icon: ICONS.project,
                    children: [
                        { title: 'list', path: paths.dashboard.projects.list },
                        { title: 'details', path: paths.dashboard.projects.details },
                        { title: 'create', path: paths.dashboard.projects.create },
                    ],
                },
                {
                    title: 'teams',
                    path: paths.dashboard.teams.list,
                    icon: ICONS.teams,
                    children: [
                        { title: 'list', path: paths.dashboard.teams.list },
                        { title: 'details', path: paths.dashboard.teams.details },
                        { title: 'create', path: paths.dashboard.teams.create },
                    ],
                },
                {
                    title: 'tasks',
                    path: paths.dashboard.tasks.list,
                    icon: ICONS.task,
                },
            ],
        },
        {
            subheader: 'Communication',
            items: [
                { title: 'Chats', path: paths.dashboard.communication.chat, icon: ICONS.chat },
            ],
        },
    ]);

    return data;
}
