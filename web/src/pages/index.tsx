import { NavBar } from "../components/NavBar";
import { withApollo } from "../utils/withApollo";



const Index = () => (
    <>
        <NavBar />
    </>
);

export default withApollo({ ssr: true })(Index);
