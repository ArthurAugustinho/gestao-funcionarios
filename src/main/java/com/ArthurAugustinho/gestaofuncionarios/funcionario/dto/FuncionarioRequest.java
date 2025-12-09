package com.ArthurAugustinho.gestaofuncionarios.funcionario.dto;

import com.ArthurAugustinho.gestaofuncionarios.funcionario.entity.StatusFuncionario;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FuncionarioRequest {

    @NotBlank
    private String nome;

    @NotNull
    @PastOrPresent
    private LocalDate dataAdmissao;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal salario;

    @NotNull
    private StatusFuncionario status;
}
