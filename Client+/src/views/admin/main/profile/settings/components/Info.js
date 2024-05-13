// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import React from 'react';
export default function Settings(props) {
  const { user } = props;

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
          />
          <InputField
            mb="25px"
            id="email"
            label="Email Address"
            placeholder={user.email}
          />
          <InputField
            mb="25px"
            me="30px"
            id="full_name"
            label="Full Name"
            placeholder={user.name}
          />
          <InputField
            mb="25px"
            me="30px"
            id="phone"
            label="Phone number"
            placeholder={user.phone}
          />
        </SimpleGrid>
        <InputField id="level" label="level" placeholder={user.level} />

        <Button
          variant="brand"
          minW="183px"
          fontSize="sm"
          fontWeight="500"
          ms="auto"
        >
          Save changes
        </Button>
      </Card>
    </FormControl>
  );
}
