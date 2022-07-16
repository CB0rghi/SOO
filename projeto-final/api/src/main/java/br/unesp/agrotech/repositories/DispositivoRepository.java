package br.unesp.agrotech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.unesp.agrotech.entities.DispositivoEntity;

@Repository
public interface DispositivoRepository extends JpaRepository<DispositivoEntity, Long> {
}
