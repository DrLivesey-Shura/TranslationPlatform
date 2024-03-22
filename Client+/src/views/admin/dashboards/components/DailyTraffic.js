// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue, 
} from '@chakra-ui/react';
import BarChart from 'components/charts/BarChart';

// Custom components
import Card from 'components/card/Card';
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from 'variables/charts';

// Assets
import { RiArrowUpSFill } from 'react-icons/ri'; 

export default function DailyTraffic(props) {
  const { ...rest } = props; 

  const newOptions = {
    ...barChartOptionsDailyTraffic,
    fill: {
      ...barChartOptionsDailyTraffic.fill,
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: "var(--chakra-colors-brand-500)",
              opacity: 1,
            },
            {
              offset: 100,
              color: 'white',
              opacity: 0.28,
            },
          ],
        ],
      },
    },
  };

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Card alignItems="center" flexDirection="column" w="100%" {...rest}>
      <Flex justify="space-between" align="start" px="10px" pt="5px" w="100%">
        <Flex flexDirection="column" align="start" me="20px">
          <Flex w="100%">
            <Text
              color="secondaryGray.600"
              me="auto"
              fontSize="sm"
              fontWeight="500"
            >
              Daily Traffic
            </Text>
          </Flex>

          <Flex align="end">
            <Text
              color={textColor}
              fontSize="34px"
              fontWeight="700"
              lineHeight="100%"
            >
              2.579
            </Text>
            <Text
              ms="6px"
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
            >
              Visitors
            </Text>
          </Flex>
        </Flex>
        <Flex align="center">
          <Icon as={RiArrowUpSFill} color="green.500" />
          <Text color="green.500" fontSize="sm" fontWeight="700">
            +2.45%
          </Text>
        </Flex>
      </Flex>
      <Box h="240px" mt="auto">
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={newOptions}
        />
      </Box>
    </Card>
  );
}
