import React from 'react';
import Navbar from './navbar';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';

function Home() {
  return (
    <>
      <Box>
        <Navbar />
        <Header />
        <Footer />
      </Box>
    </>
  );
}

export default Home;
