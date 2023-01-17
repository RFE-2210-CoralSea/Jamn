import { VStack } from "@chakra-ui/react"
import { List, Heading } from "@chakra-ui/react"
import { ItemList } from "./ItemList"
type PersonalDescriptionProps = {
  instruments: string[],
  sectionName: string,
}

export const PersonalDescription = (props:PersonalDescriptionProps ) => {
    return(
      <VStack width="376px" height="462px" top="487px" left="42px" bgColor="#87D8C8" pos="absolute" rounded={10}>
        <Heading color="black" borderBottom="1px solid black" mt={8}>
          Instruments
        </Heading>
        <List color="black" spacing={1} fontSize="4xl" textAlign="center">
          <ItemList items={props.instruments}/>
        </List>
      </VStack>
    )
}