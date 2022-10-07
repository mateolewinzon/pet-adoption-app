import { Container } from "components";
import { PagetWithAuth } from "types";
import { SIGNIN_REQUIRED_POST } from "utils/errorCodes";

const Post: PagetWithAuth = () => {
  return <Container>post pet</Container>;
};

export default Post;

Post.auth = {
  requiredStatus: 'authenticated',
  message: SIGNIN_REQUIRED_POST
}