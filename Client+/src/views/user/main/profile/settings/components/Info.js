// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import Card from 'components/card/Card.js';
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import React, { useState } from 'react';

export default function Settings(props) {
  const { user } = props;
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [phone, setPhone] = useState('');

  const editUserInfo = async () => {
    try {
      const response = await axios.put(
        `/user/${user._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
        {
          name: name,
          username: username,
          email: email,
          level: level,
          phone: phone,
        },
      );
      if (response.status === 200) {
        const updatedUser = response.data.user;
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      }

      if (response.status === 201) {
        console.log('Translation demand created successfully');
      }
    } catch (error) {
      console.error('Error creating translation demand:', error);
    }
  };

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  return (
    <FormControl>
      <Card>
        <Flex direction="column" mb="40px" ms="10px">
          <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
            Account Settings
          </Text>
          <Text fontSize="md" color={textColorSecondary}>
            Here you can change user account information
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: '20px', xl: '20px' }}
        >
          <InputField
            mb="25px"
            me="30px"
            id="username"
            label="Username"
            placeholder={user.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            mb="25px"
            id="email"
            label="Email Address"
            placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            mb="25px"
            me="30px"
            id="full_name"
            label="Full Name"
            placeholder={user.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            mb="25px"
            me="30px"
            id="phone"
            label="Phone number"
            placeholder={user.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </SimpleGrid>
        <InputField
          id="level"
          label="level"
          placeholder={user.level}
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />

        <Button
          variant="brand"
          minW="183px"
          fontSize="sm"
          fontWeight="500"
          ms="auto"
          onClick={editUserInfo}
        >
          Save changes
        </Button>
      </Card>
    </FormControl>
  );
}
