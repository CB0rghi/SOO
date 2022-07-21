package br.unesp.agrotech.services.locacao.v1.impl;

import br.unesp.agrotech.dtos.DispositivoDTO;
import br.unesp.agrotech.entities.CategoriaDispositivo;
import br.unesp.agrotech.entities.Dispositivo;
import br.unesp.agrotech.entities.Estante;
import br.unesp.agrotech.entities.Nicho;
import br.unesp.agrotech.entities.TipoDispositivo;
import br.unesp.agrotech.repositories.DispositivoRepository;
import br.unesp.agrotech.services.locacao.v1.CategoriaDispositivoService;
import br.unesp.agrotech.services.locacao.v1.DispositivoService;
import br.unesp.agrotech.services.locacao.v1.EstanteService;
import br.unesp.agrotech.services.locacao.v1.NichoService;
import br.unesp.agrotech.services.locacao.v1.TipoDispositivoService;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class DispositivoServiceImpl extends BaseServiceImpl<DispositivoDTO, Dispositivo> implements DispositivoService {
    private final static Dispositivo entity = new Dispositivo();

    private final EstanteService estanteService;
    private final DispositivoRepository dispositivoRepository;
    private final TipoDispositivoService tipoDispositivoService;
    private final CategoriaDispositivoService categoriaDispositivoService;
    private final NichoService nichoService;

    public DispositivoServiceImpl(ModelMapper modelMapper,
        DispositivoRepository dispositivoRepository,
        EstanteService estanteService,
        TipoDispositivoService tipoDispositivoService,
        CategoriaDispositivoService categoriaDispositivoService,
        NichoService nichoService) {

        super(modelMapper, dispositivoRepository, entity);
        this.estanteService = estanteService;
        this.dispositivoRepository = dispositivoRepository;
        this.tipoDispositivoService = tipoDispositivoService;
        this.categoriaDispositivoService = categoriaDispositivoService;
        this.nichoService = nichoService;
    }

    @Override
    public void cadastrar(DispositivoDTO dispositivoDTO) throws Exception {
        Estante estanteEntity = estanteService.buscarPorId(dispositivoDTO.getIdEstante());
        TipoDispositivo tipoDispositivoEntity = tipoDispositivoService.buscarPorId(dispositivoDTO.getIdTipoDispositivo());
        CategoriaDispositivo categoriaDispositivoEntity = categoriaDispositivoService.buscarPorId(dispositivoDTO.getIdCategoriaDispositivo());
        Nicho nichoEntity = nichoService.buscarPorId(dispositivoDTO.getIdNicho());

        entity.setCategoriaDispositivo(categoriaDispositivoEntity);
        entity.setEstante(estanteEntity);
        entity.setNicho(nichoEntity);
        entity.setTipoDispositivo(tipoDispositivoEntity);

        try {
            dispositivoRepository.save(entity);
        } catch(Exception exception) {
            throw new Exception("Erro ao salvar dados", exception);
        }
    }
}
