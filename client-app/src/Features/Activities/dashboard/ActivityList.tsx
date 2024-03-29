import { Activity } from 'App/models/interfaces/activity';
import { createPagingParams } from 'App/models/interfaces/pagination';
import { useStore } from 'App/stores/store';
import ActivityFilters from 'Features/Activities/dashboard/ActivityFilters';
import ActivityListItem from 'Features/Activities/dashboard/ActivityListItem';
import ActivityListItemPlaceholder from 'Features/Activities/dashboard/ActivityListItemPlaceholder';
import { observer } from 'mobx-react-lite';
import { Fragment, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Header, Loader } from 'semantic-ui-react';

function ActivityList() {
  const { activityStore } = useStore();
  const [loadingNext, setLoadingNext] = useState(false);
  const { groupedActivities, pagination, setPagingParams, loadActivities } =
    activityStore;

  const handleGetNext = () => {
    setLoadingNext(true);
    setPagingParams(createPagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  };

  return (
    <Grid>
      <Grid.Column width='10'>
        {activityStore.loadingInitial && !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            {groupedActivities.map(([group, activities]) => (
              <Fragment key={group}>
                <Header sub color='teal'>
                  {group}
                </Header>
                {activities.map((a: Activity) => (
                  <ActivityListItem key={a.id} activity={a} />
                ))}
              </Fragment>
            ))}
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityList);
