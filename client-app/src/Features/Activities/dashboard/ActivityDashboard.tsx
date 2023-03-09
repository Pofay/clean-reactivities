import { useStore } from 'App/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function ActivityDashboard() {
  const { activityStore } = useStore();
  const { activityRegistry, loadActivities } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default observer(ActivityDashboard);
