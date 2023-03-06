import { Activity } from 'App/models/interfaces/activity';
import { createPagingParams } from 'App/models/interfaces/pagination';
import { useStore } from 'App/stores/store';
import ActivityFilters from 'Features/Activities/dashboard/ActivityFilters';
import ActivityListItem from 'Features/Activities/dashboard/ActivityListItem';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Header, Loader } from 'semantic-ui-react';

interface Props {
  loadingNext: boolean;
  setLoadingNext: (arg: boolean) => void;
}

function ActivityList(props: Props) {
  const { activityStore } = useStore();
  const { loadingNext, setLoadingNext } = props;
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
