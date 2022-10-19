import { Container } from 'components'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react';

const Profile: NextPage = () => {

  const session = useSession();

  console.log(session);

  return (
    <Container>
      my profile
    </Container>      
  )
}

export default Profile
