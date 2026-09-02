# Etapa 1: Compilação
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app

# Copia as dependências (.jar) e o código fonte
COPY lib/ lib/
COPY src/ src/

# Compila todos os .java, incluindo os JARs no classpath
RUN javac -cp "lib/*" -d out $(find src -name "*.java")

# Etapa 2: Execução (imagem menor, só JRE)
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copia as classes compiladas e as libs
COPY --from=build /app/out/ out/
COPY --from=build /app/lib/ lib/

# Porta da API Principal
EXPOSE 8000

# Executa a classe principal (ajuste o nome quando criar a classe Main)
CMD ["java", "-cp", "out:lib/*", "com.helpdesk.api.Main"]
