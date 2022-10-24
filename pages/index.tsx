import { Container } from "components";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Home = () => {
  const {data: session} = useSession();

  return <Container>menem</Container>;
};

export default Home;
