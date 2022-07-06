package br.unesp.agrotech.services.locacao.v1;

import java.util.List;

public interface BaseService<DTO, Entity> {
    void cadastrar(DTO dto) throws Exception;
    List<Entity> buscar() throws Exception;
    Entity buscarPorId(Long id) throws Exception;
    Entity atualizar(Long id, DTO dto) throws Exception;
    void deletar(Long id) throws Exception;
}
