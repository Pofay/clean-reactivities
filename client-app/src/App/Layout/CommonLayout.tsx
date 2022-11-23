import { Container } from 'semantic-ui-react'
import Navbar from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

function CommonLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>{children}</Container>
    </>
  )
}

export default CommonLayout
