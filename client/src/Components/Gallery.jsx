import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Gallery = ({ files }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <SimpleGrid templateColumns="repeat(3, 1fr)">
      <AnimatePresence>
        {files.map(({ photo, _id }) => (
          <motion.div
            key={_id}
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
          >
            <Card
              bg={useColorModeValue("#ffffffcc", "#171923cc")}
              key={_id}
              m="12px"
              w="380px"
              display="flex"
              flexDirection="column"
            >
              <CardHeader>
                <Heading size="md">{photo}</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter justifyItems="center" justifyContent="center">
                <Button width="100px" mr="12px" bg="#3887BE">
                  Download
                </Button>
                <Button width="100px" bg="rebeccapurple">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </SimpleGrid>
  );
};

export default Gallery;
