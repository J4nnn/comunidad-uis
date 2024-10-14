public class EnviarInformacion {
    private Grupo grupo;
    private String destinatarios;
    private String asunto;
    private String contenido;

    public EnviarInformacion() {}
    public EnviarInformacion(Grupo grupo, String destinatarios, String asunto, String contenido) {}

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public String getDestinatarios() {
        return destinatarios;
    }

    public void setDestinatarios(String destinatarios) {
        this.destinatarios = destinatarios;
    }

    public String getAsunto() {
        return asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }
}