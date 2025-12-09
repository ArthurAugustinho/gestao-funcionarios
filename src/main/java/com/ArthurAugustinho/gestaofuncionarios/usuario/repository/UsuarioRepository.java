package com.ArthurAugustinho.gestaofuncionarios.usuario.repository;

import com.ArthurAugustinho.gestaofuncionarios.usuario.entity.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);
}
