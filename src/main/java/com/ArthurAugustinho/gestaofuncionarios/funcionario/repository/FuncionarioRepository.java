package com.ArthurAugustinho.gestaofuncionarios.funcionario.repository;

import com.ArthurAugustinho.gestaofuncionarios.funcionario.entity.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}
