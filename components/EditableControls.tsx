import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { ButtonGroup, Flex, IconButton, useEditableControls } from '@chakra-ui/react'

export const EditableControls = () => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
    useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton aria-label="SubmitEdit" icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton aria-label="CancelEdit" icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton aria-label="EditField" size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    </Flex>
  )
}
