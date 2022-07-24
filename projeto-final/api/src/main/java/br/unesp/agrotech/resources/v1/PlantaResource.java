package br.unesp.agrotech.resources.v1;

import br.unesp.agrotech.dtos.CreatePlantaDTO;
import br.unesp.agrotech.entities.PlantaEntity;
import br.unesp.agrotech.services.locacao.v1.PlantaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(tags = { "Planta" })
@RestController
@RequestMapping("/planta")
@RequiredArgsConstructor
public class PlantaResource {

    private final PlantaService plantaService;

    @ApiOperation(value = "Este serviço cadastra novas plantas")
    @PostMapping("/")
    public ResponseEntity<Void> cadastrarPlanta(
        @ApiParam(value = "Dados da planta que será cadastrada", required = true)
        @Valid @RequestBody CreatePlantaDTO createPlantaDto
    ) throws Exception {
        plantaService.cadastrar(createPlantaDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @ApiOperation(value = "Este serviço retorna uma lista de plantas")
    @GetMapping("/")
    public ResponseEntity<List<PlantaEntity>> buscarPlanta() throws Exception {
        List<PlantaEntity> plantas = plantaService.buscar();
        return ResponseEntity.status(HttpStatus.OK).body(plantas);
    }

    @ApiOperation(value = "Este serviço atualiza uma planta através do id")
    @PutMapping("/{idPlanta}")
    public ResponseEntity<PlantaEntity> atualizarPlanta(
        @ApiParam(value = "Id da planta a ser atualizada", required = true)
        @PathVariable("idPlanta") String idPlanta,
        @ApiParam(value = "Dados da planta que podem ser atualizados")
        @RequestBody CreatePlantaDTO createPlantaDto
    ) throws Exception {
        PlantaEntity plantaAtualizado = plantaService.atualizar(Long.parseLong(idPlanta), createPlantaDto);
        return ResponseEntity.status(HttpStatus.OK).body(plantaAtualizado);
    }

    @ApiOperation(value = "Este serviço remove uma planta através do id")
    @DeleteMapping("/{idPlanta}")
    public ResponseEntity<Void> deletarPlanta(
        @ApiParam(value = "Id da planta a ser removida", required = true)
        @PathVariable("idPlanta") String idPlanta
    ) throws Exception {
        plantaService.deletar(Long.parseLong(idPlanta));
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
