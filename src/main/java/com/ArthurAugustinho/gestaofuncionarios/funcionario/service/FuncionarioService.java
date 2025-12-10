package com.ArthurAugustinho.gestaofuncionarios.funcionario.service;

import com.ArthurAugustinho.gestaofuncionarios.common.exception.BusinessException;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.dto.FuncionarioRequest;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.dto.FuncionarioResponse;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.entity.Funcionario;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.entity.StatusFuncionario;
import com.ArthurAugustinho.gestaofuncionarios.funcionario.repository.FuncionarioRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
// Regras de negócio de funcionários: filtra lista, busca por id, cria/atualiza/apaga com validação simples.
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

    public FuncionarioResponse buscarPorId(Long id) {
        return toResponse(getByIdOrThrow(id));
    }

    public FuncionarioResponse criar(FuncionarioRequest request) {
        validarDataAdmissao(request.getDataAdmissao());

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

    public FuncionarioResponse atualizar(Long id, FuncionarioRequest request) {
        Funcionario existente = getByIdOrThrow(id);
        validarDataAdmissao(request.getDataAdmissao());

        existente.setNome(request.getNome());
        existente.setDataAdmissao(request.getDataAdmissao());
        existente.setSalario(request.getSalario());
        existente.setStatus(request.getStatus());
        existente.setUpdatedAt(LocalDateTime.now());

        return toResponse(funcionarioRepository.save(existente));
    }

    public void deletar(Long id) {
        Funcionario existente = getByIdOrThrow(id);
        funcionarioRepository.delete(existente);
    }

    private Funcionario getByIdOrThrow(Long id) {
        return funcionarioRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Funcionario nao encontrado"));
    }

    private void validarDataAdmissao(LocalDate dataAdmissao) {
        if (dataAdmissao == null || dataAdmissao.isAfter(LocalDate.now())) {
            throw new BusinessException("Data de admissao nao pode ser futura");
        }
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
