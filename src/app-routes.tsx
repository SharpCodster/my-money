import { HomePage, TasksPage, ProfilePage, TreeViewPage, TagsPage, PayeesPage, BalancePage } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/tasks',
        element: TasksPage
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    }, 
  {
    path: '/tree-view',
    element: TreeViewPage
  }, 
  {
    path: '/tags',
    element: TagsPage
  }, 
  {
    path: '/payees',
    element: PayeesPage
  }, 
  {
    path: '/balance',
    element: BalancePage
  }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
