// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import axios from 'axios';
import { MultiSelect, useMultiSelect } from 'chakra-multiselect';
// Custom components
import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import React, { useState } from 'react';
import { MdOutlineCloudUpload } from 'react-icons/md';
import Dropzone from 'views/user/main/Uploads/newUpload/components/Dropzone';

export default function NewUser() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [activeBullets, setActiveBullets] = useState({
    user: true,
    address: false,
    profile: false,
  });
  const theme = useTheme();

  const [lineColor, setLineColor] = useState(theme.colors.brand[500]);
  //eslint-disable-next-line
  const [lineColorDark, setLineColorDark] = useState(theme.colors.brand[400]);
  const brand = useColorModeValue(lineColor, lineColorDark);

  const userTab = React.useRef();
  const addressTab = React.useRef();
  const profileTab = React.useRef();

  const user = JSON.parse(localStorage.getItem('userInfo'));
  const { value, options, onChange } = useMultiSelect({
    value: [],
    options: ['arab', 'french', 'english'],
  });
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleNameChange = (e) => {
    setNewUserData({ ...newUserData, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setNewUserData({ ...newUserData, email: e.target.value });
  };
  const handlePhoneChange = (e) => {
    setNewUserData({ ...newUserData, phone: e.target.value });
  };

  const handleCreateUser = async () => {
    const userData = {
      ...newUserData,
      languages: value.map((option) => option.value),
    };
    console.log('Creating user with data:', userData);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const response = await axios.post('/employee/', userData, config);

      if (response.status === 200) {
        console.log('Employee Created successfully');
      }
    } catch (error) {
      console.error('Error Creating Employee:', error);
    }
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      pt={{ sm: '125px', lg: '75px' }}
      position="relative"
    >
      <Box
        h="45vh"
        bgGradient="linear(to-b, brand.400, brand.600)"
        position="absolute"
        w="100%"
        borderRadius="20px"
      />

      <Tabs
        variant="unstyled"
        zIndex="0"
        mt={{ base: '60px', md: '165px' }}
        display="flex"
        flexDirection="column"
      >
        <TabPanels mt="24px" maxW={{ md: '90%', lg: '100%' }} mx="auto">
          <TabPanel
            w={{ sm: '330px', md: '700px', lg: '850px' }}
            p="0px"
            mx="auto"
          >
            <Card p="30px">
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
                User Info
              </Text>
              <Flex direction="column" w="100%">
                <Stack direction="column" spacing="20px">
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                    <InputField
                      mb="0px"
                      id="first"
                      placeholder="eg. Esthera"
                      label="Full Name"
                      value={newUserData.name}
                      onChange={handleNameChange}
                    />

                    <InputField
                      mb="0px"
                      id="Email"
                      placeholder="eg. hello@simmmple.com"
                      label="Email Address"
                      value={newUserData.email}
                      onChange={handleEmailChange}
                    />
                    <InputField
                      mb="0px"
                      id="Confirm"
                      placeholder="4030120241"
                      label="Phone"
                      value={newUserData.phone}
                      onChange={handlePhoneChange}
                    />
                    <MultiSelect
                      outline="2px solid transparent"
                      position="relative"
                      outlineOffset="2px"
                      padding="20px"
                      fontWeight="500"
                      height="44px"
                      options={options}
                      value={value}
                      label="Choose or create items"
                      onChange={onChange}
                      create
                    />
                  </SimpleGrid>
                </Stack>
                <Flex justify="space-between" mt="24px">
                  <Button
                    variant="darkBrand"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: '128px', md: '148px' }}
                    h="46px"
                    onClick={handleCreateUser}
                  >
                    Submit
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
