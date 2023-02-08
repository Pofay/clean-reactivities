import { Grid, Header } from 'semantic-ui-react';

function PhotoUploadWidget() {
  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 1 - Add Photo' />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 2 - Resize Image' />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 3 - Preview and Upload' />
      </Grid.Column>
    </Grid>
  );
}

export default PhotoUploadWidget;
