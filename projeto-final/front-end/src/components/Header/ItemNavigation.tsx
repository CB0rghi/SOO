import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

type ItemNavigationProps = {
  text: string,
  redirect: string
}

export function ItemNavigation ({ text, redirect }: ItemNavigationProps) {
  const { pathname } = useRouter()
  return (
    <Text
      as="a"
      href={redirect}
      display="flex"
      alignItems="center"
      height="100%"
      fontSize={20}
      fontWeight="medium"
      padding="16px"
      borderRadius="8px"
      bg={pathname === redirect ? 'yellow.800' : 'unset'}
      color={pathname === redirect ? 'white' : 'yellow.800'}
      _hover={{
        backgroundColor: 'yellow.800',
        color: 'white'
      }}
      >
      {text}
    </Text>
  )
}
