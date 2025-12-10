package com.ArthurAugustinho.gestaofuncionarios.usuario.controller;

import com.ArthurAugustinho.gestaofuncionarios.usuario.dto.UsuarioRequest;
import com.ArthurAugustinho.gestaofuncionarios.usuario.dto.UsuarioResponse;
import com.ArthurAugustinho.gestaofuncionarios.usuario.service.UsuarioService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
// API protegida para listar e criar usuários.
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listar() {
        return ResponseEntity.ok(usuarioService.listar());
    }

    @PostMapping
    public ResponseEntity<UsuarioResponse> criar(@Valid @RequestBody UsuarioRequest request) {
        return ResponseEntity.ok(usuarioService.criar(request));
    }
}
