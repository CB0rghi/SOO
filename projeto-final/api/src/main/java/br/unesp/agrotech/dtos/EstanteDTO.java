package br.unesp.agrotech.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstanteDTO {
    private int qtdPrateleiras;
    private int qtdNichosPorPrateleira;
    private String descricao;
}
