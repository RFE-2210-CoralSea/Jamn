import { ListItem } from "@chakra-ui/react"
type ListProps = {
  items: string[],
}

export const ItemList = (props: ListProps) => {
  const listItems = props.items.map((item) => {
    return <ListItem>{item}</ListItem>
  })

  return (
    <>
    {listItems}
    </>
  )
}

