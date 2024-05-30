// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import Card from 'components/card/Card.js';
import InputField from 'components/fields/InputField';
import React, { useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';

export default function Settings(props) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  const { user } = props;
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);
  const handleClick3 = () => setShow3(!show3);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    try {
      const response = await axios.put(
        `/user/change-password/${user._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
        {
          currentPassword,
          newPassword,
        },
      );

      if (response.status === 200) {
        setMessage('Password changed successfully');
        localStorage.removeItem('userInfo');
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <FormControl>
      <Card>
        <Flex direction="column" mb="40px" ms="10px">
          <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
            Change password
          </Text>
          <Text fontSize="md" color={textColorSecondary}>
            Here you can set your new password
          </Text>
        </Flex>
        <FormControl>
          <Flex flexDirection="column">
            <InputGroup size="md" my="15px">
              <Input
                mb="25px"
                textColor="white"
                outline="2px solid transparent"
                outlineOffset="2px"
                appearance="none"
                borderRadius="16px"
                border="1px solid"
                borderColor="whiteAlpha.100"
                id="old"
                size="md"
                fontSize="sm"
                height="52px"
                padding="20px"
                paddingInlineEnd="1rem"
                placeholder="***********"
                type={show ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <InputRightElement
                display="flex"
                alignItems="center"
                mt="4px"
                cursor="pointer"
                onClick={handleClick}
              >
                <Icon
                  color={textColorSecondary}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                />
              </InputRightElement>
            </InputGroup>

            <InputGroup size="md" my="15px">
              <Input
                mb="25px"
                textColor="white"
                outline="2px solid transparent"
                outlineOffset="2px"
                appearance="none"
                borderRadius="16px"
                border="1px solid"
                borderColor="whiteAlpha.100"
                size="md"
                fontSize="sm"
                height="52px"
                padding="20px"
                paddingInlineEnd="1rem"
                id="new"
                label="New Password"
                placeholder="***********"
                value={newPassword}
                type={show2 ? 'text' : 'password'}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <InputRightElement
                display="flex"
                alignItems="center"
                mt="4px"
                cursor="pointer"
                onClick={handleClick2}
              >
                <Icon
                  color={textColorSecondary}
                  as={show2 ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                />
              </InputRightElement>
            </InputGroup>
            <InputGroup size="md" my="15px">
              <Input
                mb="25px"
                outline="2px solid transparent"
                outlineOffset="2px"
                appearance="none"
                borderRadius="16px"
                border="1px solid"
                borderColor="whiteAlpha.100"
                size="md"
                fontSize="sm"
                height="52px"
                padding="20px"
                paddingInlineEnd="1rem"
                id="confirm"
                type={show3 ? 'text' : 'password'}
                textColor="white"
                label="New Password Confirmation"
                placeholder="***********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <InputRightElement
                display="flex"
                alignItems="center"
                mt="4px"
                cursor="pointer"
                onClick={handleClick3}
              >
                <Icon
                  color={textColorSecondary}
                  as={show3 ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                />
              </InputRightElement>
            </InputGroup>
          </Flex>
        </FormControl>
        <Button
          variant="brand"
          minW="183px"
          fontSize="sm"
          fontWeight="500"
          ms="auto"
          onClick={handleChangePassword}
        >
          Change Password
        </Button>
        {message && <p>{message}</p>}
      </Card>
    </FormControl>
  );
}
