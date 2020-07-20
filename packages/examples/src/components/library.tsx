import React from 'react'
import { useToasts } from 'react-cooked-bread'
import { Flex, Box } from 'reflexbox'

export const Library: React.FC = () => {
  const { addToast, toasts } = useToasts()

  return (
    <Flex>
      <button
        onClick={() => {
          addToast('test', {
            autoDismiss: true,
          })
        }}
      >
        Add Toast
      </button>

      <Box ml={3}>Active toasts: {toasts.length}</Box>
    </Flex>
  )
}
