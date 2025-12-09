package com.ArthurAugustinho.gestaofuncionarios.auth.service;

import com.ArthurAugustinho.gestaofuncionarios.auth.dto.LoginRequest;
import com.ArthurAugustinho.gestaofuncionarios.auth.dto.LoginResponse;
import com.ArthurAugustinho.gestaofuncionarios.usuario.entity.Usuario;
import com.ArthurAugustinho.gestaofuncionarios.usuario.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Credenciais inválidas"));

        if (!passwordEncoder.matches(request.getSenha(), usuario.getSenhaHash())) {
            throw new BadCredentialsException("Credenciais inválidas");
        }

        UserDetails userDetails = buildUserDetails(usuario);
        String token = jwtService.generateToken(userDetails);

        return new LoginResponse(
                token,
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole().name()
        );
    }

    private UserDetails buildUserDetails(Usuario usuario) {
        return User.builder()
                .username(usuario.getEmail())
                .password(usuario.getSenhaHash())
                .authorities(new SimpleGrantedAuthority("ROLE_" + usuario.getRole().name()))
                .build();
    }
}
