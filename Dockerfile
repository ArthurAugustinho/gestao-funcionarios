# Etapa de build: empacota o backend Spring Boot em um JAR.
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml ./
COPY .mvn .mvn
COPY mvnw mvnw
RUN ./mvnw -B dependency:go-offline
COPY src src
RUN ./mvnw -B -DskipTests package

# Etapa de runtime: usa JRE leve para rodar o JAR.
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/target/gestao-funcionarios-0.0.1-SNAPSHOT.jar /app/app.jar
# Variáveis de ambiente para configurar acesso ao banco.
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/gestao_funcionarios \
    SPRING_DATASOURCE_USERNAME=postgres \
    SPRING_DATASOURCE_PASSWORD=postgres
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
