import { Container } from 'components'
import type { PagetWithAuth } from 'types'
import { SIGNIN_REQUIRED_PROFILE } from 'utils/errorCodes'

const Profile: PagetWithAuth = () => {
  return (
    <Container>
      my profile
    </Container>      
  )
}

export default Profile

Profile.auth = {
  requiredStatus: 'authenticated',
  message: SIGNIN_REQUIRED_PROFILE
}
