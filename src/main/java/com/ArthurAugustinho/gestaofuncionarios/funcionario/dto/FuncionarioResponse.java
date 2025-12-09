package com.ArthurAugustinho.gestaofuncionarios.funcionario.dto;

import com.ArthurAugustinho.gestaofuncionarios.funcionario.entity.StatusFuncionario;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FuncionarioResponse {

    private Long id;
    private String nome;
    private LocalDate dataAdmissao;
    private BigDecimal salario;
    private StatusFuncionario status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
