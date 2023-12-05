import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from './component/authentication/Login';
import Signup from './component/authentication/Signup';
import Product from './component/product/Product';
import MyProduct from './component/product/createProduct/MyProduct';
import AllProduct from './component/product/allProduct/AllProduct';
import Transaction from './component/product/transaction/Transaction';
import CreateProduct from './component/product/createProduct/CreateProduct';
import EditProduct from './component/product/editProduct/EditProduct';
import BuyProduct from './component/product/buy/BuyProduct';
import Bought from './component/product/transaction/Bought';
import Sold from './component/product/transaction/Sold';
import Borrowed from './component/product/transaction/Borrowed';
import Lent from './component/product/transaction/Lent';
import { Suspense, useEffect, useState } from 'react';
import Loader from './component/product/Loader';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

function App() {
  const [token, setToken] = useState('');
  const handleLogin = (newToken) => {
    setToken(newToken);
  };
  useEffect(()=>{
  },[token])
  
  const httpLink = createHttpLink({
    uri: 'http://localhost:8081/teebay',
  });
  
  const getToken = () => {
    return localStorage.getItem("authToken")
  };
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
  
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return (
   <ApolloProvider client={client}>
    <Router>
        <Suspense fallback={<div className='flex items-center justify-center h-screen'>
          <Loader size={50}/>
        </div>}>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/buyProduct/:id" element={<BuyProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="dashbord" element={<Product/>}>
              <Route path="myProduct" element={<MyProduct />} />
              <Route path="allProduct" element={<AllProduct />} />
        </Route>
         <Route path="transaction" element={<Transaction />}>
                  <Route path="bought" element={<Bought />} />
                  <Route path="sold" element={<Sold />} />
                  <Route path="borrowed" element={<Borrowed />} />
                  <Route path="lent" element={<Lent />} />
        </Route>
      </Routes>
      </Suspense>
    </Router>
    </ApolloProvider>

  );
}

export default App;
