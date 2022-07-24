import {
  Flex,
  Grid,
  Text
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { Header } from '../components/Header'
import { ModalEstanteForm } from '../components/ModalEstanteForm'
import { ShelfTable } from '../components/Shelf/ShelfTable'
import { ShelfService } from '../services/ShelfService'
import { EstanteType } from '../services/types'

interface IEstantes {
  estantes?: EstanteType[];
}

const Estantes: NextPage = ({ estantes }: IEstantes) => {
  if (!estantes) {
    return null
  }

  return (
    <Grid
      templateAreas={`
        "header"
        "main"
      `}
      templateRows="1fr 11fr"
      templateColumns="12fr"
      gap="5rem"
      padding="2rem"
      height="100%"
    >
      <Header />
      <Flex
        border="1px solid"
        borderColor="gray.300"
        borderRadius="0.5rem"
        padding="1rem"
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
        {estantes
          ? (<ShelfTable estantes={estantes}/>)
          : (<Text>Não há estantes</Text>)}
        <Flex width="100%" alignItems="end" paddingY="2rem" justifyContent="flex-end">
          <ModalEstanteForm />
        </Flex>
      </Flex>
    </Grid>
  )
}
export default Estantes

Estantes.getInitialProps = async () => {
  const estantes = await ShelfService.getAllShelfs()
  return { estantes }
}
