package br.unesp.agrotech.services.locacao.v1.impl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.util.Assert;

import br.unesp.agrotech.services.locacao.v1.BaseService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BaseServiceImpl<DTO, E> implements BaseService<DTO, E>{

    private final ModelMapper modelMapper;
    private final JpaRepository<E, Long> repository;
    private final E entity;

    @Override
    public void cadastrar(DTO dto) throws Exception {
        modelMapper.map(dto, entity);
        try {
            repository.save(entity);
        } catch(Exception exception) {
            throw new Exception("Erro ao salvar dados", exception);
        }
    }

    @Override
    public List<E> buscar() throws Exception {
        try {
            return repository.findAll();
        } catch(Exception exception) {
            throw new Exception("Erro ao buscar dados", exception);
        }
    }

    @Override
    public E buscarPorId(Long id) throws Exception {
        Assert.notNull(id, "O id é obrigatório");
        try {
            Optional<E> findedEntity = repository.findById(id);
            Assert.notNull(findedEntity, "Não existe nenhum dado com esse id");
            return findedEntity.get();
        } catch (Exception exception) {
           throw new Exception("Erro ao buscar dados pelo id passado", exception);
        }
    }

    @Override
    public E atualizar(Long id, DTO dto) throws Exception {
        try {
            Assert.notNull(id, "O identificador é obrigatório");
            E entity = this.buscarPorId(id);
            Assert.notNull(dto, "É necessário passar alguma informação para atualizar os dados");

            modelMapper.map(dto, entity);

            return repository.save(entity);
        } catch (Exception exception) {
            throw new Exception("Erro ao atualizar os dados com o identificador: " + id, exception);
        }
    }

    @Override
    public void deletar(Long id) throws Exception {
        Assert.notNull(id, "O identificador é obrigatório");
        try {
            repository.deleteById(id);
        } catch(Exception exception) {
            throw new Exception("Não foi possível deletar com o identifcador: " + id, exception);
        }

    }
}