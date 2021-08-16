import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import SellerRegisterScreen from "./screens/SellerRegisterScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/cart' component={CartScreen} />
          <Route path='/seller/register' component={SellerRegisterScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
