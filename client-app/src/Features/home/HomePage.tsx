import { Link, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../Activities/dashboard/ActivityDashboard';
import ActivityForm from '../Activities/form/ActivityForm';

export default function HomePage() {
  return (
    <Container style={{ marginTop: '7em' }}>
      <h1>Home Page</h1>
    </Container>
  );
}
