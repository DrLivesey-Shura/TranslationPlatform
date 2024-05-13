import {
  Box,
  Button,
  Flex,
  Select,
  SimpleGrid,
  Icon,
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

// Custom components
import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';
import Dropzone from 'views/admin/main/Uploads/newUpload/components/Dropzone';
import PaymentModal from 'views/admin/main/Uploads/newUpload/components/PaymentModal';
import React, { useState } from 'react';

// Assets
import { MdOutlineCloudUpload } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewUpload() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [activeBullets, setActiveBullets] = useState({
    product: true,
    media: false,
    pricing: false,
  });
  const navigate = useNavigate();
  const productTab = React.useRef();
  const mediaTab = React.useRef();
  const pricingTab = React.useRef();
  const theme = useTheme();
  //eslint-disable-next-line
  const [lineColor, setLineColor] = useState(theme.colors.brand[500]);
  //eslint-disable-next-line
  const [lineColorDark, setLineColorDark] = useState(theme.colors.brand[400]);
  const brand = useColorModeValue(lineColor, lineColorDark);
  const [uploading, setUploading] = useState(true);
  const [currentTranslationId, setCurrentTranslationId] = useState();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleUploadStateChanged = (isUploading) => {
    setUploading(isUploading);
  };
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const userId = user._id;
  const [demandData, setDemandData] = useState({
    date: '',
    language: '',
    label: '',
  });
  const [file, setFile] = useState();

  const handleDateChange = (e) => {
    setDemandData({ ...demandData, date: e.target.value });
  };

  const handleLanguageChange = (e) => {
    setDemandData({ ...demandData, language: e.target.value });
  };
  const handleLableChange = (e) => {
    setDemandData({ ...demandData, label: e.target.value });
  };

  const handleUploadSuccess = (data) => {
    console.log('Data from upload:', data);
    setFile(data);
  };

  const submitTranslationDemand = async () => {
    try {
      const response = await axios.post('/translation-demands', {
        uploadId: file._id,
        userId: userId,
        estimatedDate: demandData.date,
        label: demandData.label,
        language: demandData.language,
      });
      setCurrentTranslationId(response.data);
      if (response.status === 201) {
        console.log('Translation demand created successfully');
      }
    } catch (error) {
      console.error('Error creating translation demand:', error);
    }
  };

  const handlePayRequest = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      // Initiating payment
      const response1 = await axios.put(
        `/translation-demands/pay/${currentTranslationId._id}`,
        {
          validationStatus: 'Pending',
          paymentStatus: 'Paid',
          status: 'Pending',
        },
        config,
      );

      // Perform payment initiation logic (API call)
      const response = await axios.post(
        `/translation-demands/pay/${currentTranslationId._id}`,
        null,
        config,
      );

      if (response.status === 200) {
        console.log('Payment initiated successfully');
        setIsPaymentModalOpen(false);
      }
      navigate(`/admin/upload/upload-details/${currentTranslationId._id}`);
    } catch (error) {
      console.error('Error initiating payment:', error);
      // Handle errors or show error messages
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

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
        mt={{ base: '10px', md: '100px' }}
        zIndex="0"
        display="flex"
        flexDirection="column"
      >
        <TabList
          display="flex"
          alignItems="center"
          alignSelf="center"
          justifySelf="center"
        >
          <Tab
            _focus={{ border: '0px', boxShadow: 'unset' }}
            ref={productTab}
            w={{ sm: '120px', md: '250px', lg: '300px' }}
            onClick={() =>
              setActiveBullets({
                product: true,
                media: false,
                pricing: false,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: '120px', md: '250px', lg: '300px' },
                height: '3px',
                bg: activeBullets.media ? 'white' : 'brand.400',
                left: { sm: '12px', md: '40px' },
                top: {
                  sm: activeBullets.product ? '6px' : '4px',
                  md: null,
                },
                position: 'absolute',
                bottom: activeBullets.product ? '40px' : '38px',

                transition: 'all .3s ease',
              }}
            >
              <Box
                zIndex="1"
                border="2px solid"
                borderColor={activeBullets.product ? 'white' : 'brand.400'}
                bgGradient="linear(to-b, brand.400, brand.600)"
                w="16px"
                h="16px"
                mb="8px"
                borderRadius="50%"
              />
              <Text
                color={activeBullets.product ? 'white' : 'gray.300'}
                fontWeight={activeBullets.product ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                Upload Info
              </Text>
            </Flex>
          </Tab>
          <Tab
            _focus={{ border: '0px', boxShadow: 'unset' }}
            ref={mediaTab}
            w={{ sm: '120px', md: '250px', lg: '300px' }}
            onClick={() =>
              setActiveBullets({
                product: true,
                media: true,
                pricing: false,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: '120px', md: '250px', lg: '300px' },
                height: '3px',
                bg: activeBullets.pricing ? 'white' : 'brand.400',
                left: { sm: '12px', md: '28px' },
                top: '6px',
                position: 'absolute',
                bottom: activeBullets.media ? '40px' : '38px',

                transition: 'all .3s ease',
              }}
            >
              <Box
                zIndex="1"
                border="2px solid"
                borderColor={activeBullets.media ? 'white' : 'brand.400'}
                bgGradient="linear(to-b, brand.400, brand.600)"
                w="16px"
                h="16px"
                mb="8px"
                borderRadius="50%"
              />
              <Text
                color={activeBullets.media ? 'white' : 'gray.300'}
                fontWeight={activeBullets.media ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                File
              </Text>
            </Flex>
          </Tab>
          <Tab
            _focus={{ border: '0px', boxShadow: 'unset' }}
            ref={pricingTab}
            w={{ sm: '120px', md: '250px', lg: '300px' }}
            onClick={() =>
              setActiveBullets({
                product: true,
                media: true,
                pricing: true,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
            >
              <Box
                zIndex="1"
                border="2px solid"
                borderColor={activeBullets.pricing ? 'white' : 'brand.400'}
                bgGradient="linear(to-b, brand.400, brand.600)"
                w="16px"
                h="16px"
                mb="8px"
                borderRadius="50%"
              />
              <Text
                color={activeBullets.pricing ? 'white' : 'gray.300'}
                fontWeight={activeBullets.pricing ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                Payment
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels mt="24px" maxW={{ md: '90%', lg: '100%' }} mx="auto">
          <TabPanel
            w={{ sm: '330px', md: '700px', lg: '850px' }}
            p="0px"
            mx="auto"
          >
            <Card p="30px">
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
                Upload Info
              </Text>
              <Flex direction="column" w="100%">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                  <Stack direction="column" gap="20px">
                    <Text my="20px" mx="18px" fontSize="18px" lineHeight="22px">
                      Hello {user.name} here you can upload the file you want us
                      to translate it for you and give the date you want to have
                      you doc (the sonner the much the cost){' '}
                    </Text>
                  </Stack>
                  <Stack direction="column" gap="20px">
                    <InputField
                      mb="0px"
                      id="name"
                      placeholder="ex : student certaficat"
                      label="Upload Name"
                      onChange={handleLableChange}
                    />
                    <InputField
                      mb="0px"
                      id="weight"
                      placeholder="need it before "
                      type="date"
                      label="Estimated Date"
                      onChange={handleDateChange}
                    />
                    <Select
                      id="language"
                      placeholder="Translate it to"
                      mb="0px"
                      onChange={handleLanguageChange}
                    >
                      <option value="english">English</option>
                      <option value="french">French</option>
                      <option value="spanish">Spanish</option>
                    </Select>
                  </Stack>
                </SimpleGrid>
                <Flex justify="space-between" mt="24px">
                  <Button
                    variant="darkBrand"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: '128px', md: '148px' }}
                    h="46px"
                    ms="auto"
                    onClick={() => mediaTab.current.click()}
                  >
                    Next
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </TabPanel>
          <TabPanel
            w={{ sm: '330px', md: '700px', lg: '850px' }}
            p="0px"
            mx="auto"
          >
            <Card p="30px">
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
                File Upload
              </Text>
              <Dropzone
                content={
                  <Box>
                    <Icon
                      as={MdOutlineCloudUpload}
                      w="80px"
                      h="80px"
                      color={textColor}
                    />
                    <Text
                      mx="auto"
                      mb="12px"
                      fontSize="lg"
                      fontWeight="700"
                      whiteSpace="pre-wrap"
                      color={textColor}
                    >
                      Drop your file here, or{' '}
                      <Text
                        as="span"
                        fontSize="lg"
                        fontWeight="700"
                        color={brand}
                      >
                        browse
                      </Text>
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="500"
                      color="secondaryGray.500"
                    >
                      PNG, JPG and PDF files are allowed
                    </Text>
                  </Box>
                }
                onUploadStateChanged={handleUploadStateChanged}
                onUploadSuccess={handleUploadSuccess}
              />
              <Flex justify="space-between" mt="24px">
                <Button
                  variant="light"
                  fontSize="sm"
                  borderRadius="16px"
                  w={{ base: '128px', md: '148px' }}
                  h="46px"
                  onClick={() => productTab.current.click()}
                >
                  Prev
                </Button>
                <Button
                  isLoading={uploading}
                  loadingText="Uploading"
                  variant="darkBrand"
                  fontSize="sm"
                  borderRadius="16px"
                  w={{ base: '128px', md: '148px' }}
                  h="46px"
                  onClick={() => pricingTab.current.click()}
                >
                  Next
                </Button>
              </Flex>
            </Card>
          </TabPanel>
          <TabPanel
            w={{ sm: '330px', md: '700px', lg: '850px' }}
            p="0px"
            mx="auto"
          >
            <Card p="30px">
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
                Payment
              </Text>
              <Flex direction="column" w="100%">
                <Stack direction="column" spacing="20px">
                  {/* <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    gap={{ base: '0px', md: '20px' }}
                  >
                    <InputField
                      id="price"
                      placeholder="eg. $99"
                      label="Price"
                    />
                    <InputField
                      id="code"
                      placeholder="eg. 4030120241"
                      label="Unique Code"
                    />
                    <Flex direction="column" mb="34px">
                      <FormLabel
                        ms="10px"
                        htmlFor="currency"
                        fontSize="sm"
                        color={textColor}
                        fontWeight="bold"
                        _hover={{ cursor: 'pointer' }}
                      >
                        Currency
                      </FormLabel>
                      <Select
                        fontSize="sm"
                        id="currency"
                        variant="main"
                        h="44px"
                        maxH="44px"
                        defaultValue="usd"
                      >
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                        <option value="gbp">GBP</option>
                      </Select>
                    </Flex>
                  </SimpleGrid> */}
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                    <Stack direction="column" gap="20px">
                      <Text
                        my="20px"
                        mx="18px"
                        fontSize="18px"
                        lineHeight="22px"
                      >
                        You Transaltion demand has been registred, now its time
                        for the payment the payment works on word translated (
                        for each word you pay 5.6da ) here is the resume oof the
                        payment :
                      </Text>
                    </Stack>
                    {file ? (
                      <Stack direction="column" gap="20px">
                        <Text>Translation Name : {demandData.label} </Text>
                        <Text>File Name : {file.file} </Text>
                        <Text>Number of pages : </Text>
                        <Text>Number of words : </Text>
                        <Text>Total to be Payed :3000.00 da </Text>
                      </Stack>
                    ) : (
                      <Stack direction="column" gap="20px">
                        <Text>PLease pass by the other steps</Text>
                      </Stack>
                    )}
                  </SimpleGrid>
                </Stack>
                <Flex justify="space-between" mt="24px">
                  <Button
                    variant="light"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: '128px', md: '148px' }}
                    h="46px"
                    onClick={() => mediaTab.current.click()}
                  >
                    Prev
                  </Button>
                  <Button
                    isLoading={uploading}
                    loadingText="Uploading"
                    variant="darkBrand"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: '128px', md: '148px' }}
                    h="46px"
                    onClick={() => {
                      submitTranslationDemand();
                      setIsPaymentModalOpen(true);
                    }}
                  >
                    Pay Now
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </TabPanel>
        </TabPanels>
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          handlePayRequest={handlePayRequest}
        />
      </Tabs>
    </Flex>
  );
}
