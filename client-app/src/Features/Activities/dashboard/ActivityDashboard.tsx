import LoadingComponent from 'App/Layout/LoadingComponent';
import { useStore } from 'App/stores/store';
import ActivityList from 'Features/Activities/dashboard/ActivityList';
import ActivityDetails from 'Features/Activities/details/ActivityDetails';
import ActivityForm from 'Features/Activities/form/ActivityForm';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function ActivityDashboard() {
  const { activityStore } = useStore();
  const { activityRegistry, loadActivities } = activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  if (activityStore.loadingInitial && !loadingNext)
    return <LoadingComponent content='Loading activities...' />;

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <ActivityList
              loadingNext={loadingNext}
              setLoadingNext={setLoadingNext}
            />
          }
        />
        <Route path=':id' element={<ActivityDetails />} />
        <Route path='createActivity' element={<ActivityForm />} />
        <Route path='manage/:id' element={<ActivityForm />} />
      </Routes>
    </>
  );
}

export default observer(ActivityDashboard);
