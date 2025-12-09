package com.ArthurAugustinho.gestaofuncionarios.common.exception;

// Exceção genérica para regras de negócio.
public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
