import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <h3>
        Go to <Link to='/activities'>Activities</Link>
      </h3>
    </>
  )
}
