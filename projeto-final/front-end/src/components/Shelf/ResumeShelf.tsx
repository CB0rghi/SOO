import { Divider, Flex, GridItem, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'

export function ResumeShelf () {
  const { current } = useSelector(({ estante }: AppState) => estante)
  const [resume, setResume] = useState({
    totalSensores: 0,
    totalAtuadores: 0,
    nichosOcupados: 0,
    nichosLivres: 0
  })

  useEffect(() => {
    if (current) {
      calcularResumo()
    }
  }, [current])

  if (current === null) {
    return null
  }

  const calcularResumo = () => {
    let totalSensores = 0
    let totalAtuadores = 0
    let nichosOcupados = 0
    let nichosLivres = 0

    current.prateleiras.forEach(prateleira => {
      prateleira.nichos.forEach(nicho => {
        nicho.dispositivos.forEach(dispositivo => {
          if (dispositivo.tipoDispositivo.nome.toLowerCase() === 'sensor') {
            totalSensores += 1
          }
          if (dispositivo.tipoDispositivo.nome.toLowerCase() === 'atuador') {
            totalAtuadores += 1
          }
        })
        if (nicho.plantas.length !== 0) {
          nichosOcupados += 1
        } else {
          nichosLivres += 1
        }
      })
    })

    setResume({ nichosLivres, nichosOcupados, totalAtuadores, totalSensores })
  }

  return (
    <GridItem
      area="nav2"
      border="2px solid"
      borderColor='green.600'
      borderRadius="0.5rem"
    >
      <Flex direction="column" padding="1rem" gap="0.5rem">
        <Text fontSize="1.3rem" color="green.600">
          Resumo da Estante { current.id }
        </Text>

        <Divider borderColor="green.600" orientation="horizontal" />
        <Stack spacing={3} >
          <Text>Total de sensores: {resume.totalSensores}</Text>
          <Text>Total de atuadores: {resume.totalAtuadores}</Text>
          <Text>Nichos ocupados: {resume.nichosOcupados}</Text>
          <Text>Nichos livres: {resume.nichosLivres}</Text>
        </Stack>

      </Flex>
    </GridItem>
  )
}
