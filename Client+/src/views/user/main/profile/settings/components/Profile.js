// Chakra imports
import {
  Avatar,
  Flex,
  Select,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useNavigate } from 'react-router-dom';

export default function Settings(props) {
  const { user } = props;
  const navigate = useNavigate();

  // eslint-disable-next-line
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  if (!user) {
    navigate('/auth');
    return null;
  }
  return (
    <Card mb="20px" alignItems="center">
      {/* <Image src={banner} borderRadius="16px" /> */}
      <Flex
        w="100%"
        bgGradient="linear(to-b, brand.400, brand.600)"
        minH="127px"
        borderRadius="16px"
      ></Flex>
      <Avatar
        mx="auto"
        src={
          'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light'
        }
        h="87px"
        w="87px"
        mt="-43px"
        mb="15px"
      />
      <Text fontSize="2xl" textColor={textColorPrimary} fontWeight="700">
        {user.name}
      </Text>
      <Flex align="center" mx="auto" px="15px">
        <Text
          me="4px"
          color={textColorSecondary}
          fontSize="sm"
          fontWeight="400"
          lineHeight="100%"
        >
          Account type:
        </Text>
        <Text
          id="user_type"
          w="unset"
          variant="transparent"
          display="flex"
          textColor={textColorPrimary}
          color={textColorPrimary}
          alignItems="center"
          defaultValue="useristrator"
        >
          {user.level}
        </Text>
      </Flex>
    </Card>
  );
}
