package com.ArthurAugustinho.gestaofuncionarios.usuario.dto;

import com.ArthurAugustinho.gestaofuncionarios.usuario.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// DTO de saída para listar usuários (sem expor hash de senha).
public class UsuarioResponse {

    private Long id;
    private String nome;
    private String email;
    private Role role;
}
