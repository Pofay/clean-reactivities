import Navbar from 'App/Layout/Navbar';
import { Container } from 'semantic-ui-react';

interface LayoutProps {
  children: React.ReactNode;
}

function CommonLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>{children}</Container>
    </>
  );
}

export default CommonLayout;
