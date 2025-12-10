package com.ArthurAugustinho.gestaofuncionarios.usuario.dto;

import com.ArthurAugustinho.gestaofuncionarios.usuario.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
// DTO de entrada para criar usuário.
public class UsuarioRequest {

    @NotBlank
    private String nome;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String senha;

    @NotNull
    private Role role;
}
