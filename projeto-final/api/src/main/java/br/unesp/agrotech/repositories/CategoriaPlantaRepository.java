package br.unesp.agrotech.repositories;

import br.unesp.agrotech.entities.CategoriaPlantaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaPlantaRepository extends JpaRepository<CategoriaPlantaEntity, Long> {
}
