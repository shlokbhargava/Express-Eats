import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import SellerRegisterScreen from "./screens/SellerRegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SellerDashboard from "./screens/SellerDashboard";
import EditDishScreen from "./screens/EditDishScreen";
import EditRestaurantScreen from "./screens/EditRestaurantScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/cart' component={CartScreen} />
          <Route path='/seller/register' component={SellerRegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/restaurant/edit' component={EditRestaurantScreen} />
          <Route path='/dashboard' component={SellerDashboard} />
          <Route path='/dish/:id/edit' component={EditDishScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
