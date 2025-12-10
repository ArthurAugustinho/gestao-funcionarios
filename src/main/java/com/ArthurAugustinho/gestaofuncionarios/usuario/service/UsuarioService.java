package com.ArthurAugustinho.gestaofuncionarios.usuario.service;

import com.ArthurAugustinho.gestaofuncionarios.common.exception.BusinessException;
import com.ArthurAugustinho.gestaofuncionarios.usuario.dto.UsuarioRequest;
import com.ArthurAugustinho.gestaofuncionarios.usuario.dto.UsuarioResponse;
import com.ArthurAugustinho.gestaofuncionarios.usuario.entity.Usuario;
import com.ArthurAugustinho.gestaofuncionarios.usuario.repository.UsuarioRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
// Regras de negócio para listar e criar usuários.
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UsuarioResponse> listar() {
        return usuarioRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public UsuarioResponse criar(UsuarioRequest request) {
        usuarioRepository.findByEmail(request.getEmail())
                .ifPresent(u -> {
                    throw new BusinessException("E-mail já cadastrado");
                });

        Usuario novo = new Usuario();
        novo.setNome(request.getNome());
        novo.setEmail(request.getEmail());
        novo.setSenhaHash(passwordEncoder.encode(request.getSenha()));
        novo.setRole(request.getRole());

        Usuario salvo = usuarioRepository.save(novo);
        return toResponse(salvo);
    }

    private UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole()
        );
    }
}
