package com.ArthurAugustinho.gestaofuncionarios.auth.service;

import com.ArthurAugustinho.gestaofuncionarios.usuario.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
// Adapta a entidade Usuario para UserDetails usado pelo Spring Security.
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username)
                .map(usuario -> User.builder()
                        .username(usuario.getEmail())
                        .password(usuario.getSenhaHash())
                        .authorities(new SimpleGrantedAuthority("ROLE_" + usuario.getRole().name()))
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }
}
