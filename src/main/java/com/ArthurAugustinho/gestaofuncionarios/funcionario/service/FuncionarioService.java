package com.ArthurAugustinho.gestaofuncionarios.funcionario.service;

import com.ArthurAugustinho.gestaofuncionarios.common.exception.BusinessException;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.dto.FuncionarioRequest;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.dto.FuncionarioResponse;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.entity.Funcionario;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.entity.StatusFuncionario;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.repository.FuncionarioRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
// Regras de negócio para listar e criar funcionários.
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public List<FuncionarioResponse> listar(String nome, StatusFuncionario status) {
        return funcionarioRepository.findAll().stream()
                .filter(func -> {
                    boolean matchesNome = true;
                    if (StringUtils.hasText(nome)) {
                        matchesNome = func.getNome() != null && func.getNome().toLowerCase().contains(nome.toLowerCase());
                    }
                    boolean matchesStatus = status == null || status == func.getStatus();
                    return matchesNome && matchesStatus;
                })
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public FuncionarioResponse criar(FuncionarioRequest request) {
        if (request.getDataAdmissao() == null || request.getDataAdmissao().isAfter(java.time.LocalDate.now())) {
            throw new BusinessException("Data de admissão não pode ser futura"); // Regra simples de negócio.
        }

        LocalDateTime now = LocalDateTime.now();
        Funcionario funcionario = new Funcionario();
        funcionario.setNome(request.getNome());
        funcionario.setDataAdmissao(request.getDataAdmissao());
        funcionario.setSalario(request.getSalario());
        funcionario.setStatus(request.getStatus());
        funcionario.setCreatedAt(now);
        funcionario.setUpdatedAt(now);

        Funcionario saved = funcionarioRepository.save(funcionario);
        return toResponse(saved);
    }

    private FuncionarioResponse toResponse(Funcionario funcionario) {
        return new FuncionarioResponse(
                funcionario.getId(),
                funcionario.getNome(),
                funcionario.getDataAdmissao(),
                funcionario.getSalario(),
                funcionario.getStatus(),
                funcionario.getCreatedAt(),
                funcionario.getUpdatedAt()
        );
    }
}
