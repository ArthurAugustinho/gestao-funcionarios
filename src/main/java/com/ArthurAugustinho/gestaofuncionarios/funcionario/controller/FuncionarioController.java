package com.ArthurAugustinho.gestaofuncionarios.funcionario.controller;

import com.ArthurAugustinho.gestaofuncionarios.funcionario.dto.FuncionarioRequest;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.dto.FuncionarioResponse;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.entity.StatusFuncionario;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.service.FuncionarioService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/funcionarios")
@RequiredArgsConstructor
// API protegida de funcionários: lista, busca por id, cria, atualiza e remove registros via service/DTO.
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @GetMapping
    public ResponseEntity<List<FuncionarioResponse>> listar(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) StatusFuncionario status
    ) {
        return ResponseEntity.ok(funcionarioService.listar(nome, status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(funcionarioService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<FuncionarioResponse> criar(@Valid @RequestBody FuncionarioRequest request) {
        return ResponseEntity.ok(funcionarioService.criar(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FuncionarioResponse> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody FuncionarioRequest request
    ) {
        return ResponseEntity.ok(funcionarioService.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        funcionarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
