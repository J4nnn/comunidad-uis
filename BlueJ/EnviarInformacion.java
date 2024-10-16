import java.util.ArrayList;

/**
 * Esta clase representa un objeto para enviar información a un grupo de usuarios.
 * Contiene información sobre el grupo, los destinatarios, el asunto y el contenido del mensaje.
 *
 * @author Janer Vega, Fabiana Acuña
 * @version 1.0
 */
public class EnviarInformacion {
    private Grupo grupo;
    private ArrayList<Usuario> destinatarios;
    private String asunto;
    private String contenido;

    /**
     * Constructor por defecto de la clase EnviarInformacion.
     */
    public EnviarInformacion() {}

    /**
     * Constructor de la clase EnviarInformacion.
     *
     * @param grupo El grupo al que se enviará la información.
     * @param destinatarios La lista de destinatarios.
     * @param asunto El asunto del mensaje.
     * @param contenido El contenido del mensaje.
     */
    public EnviarInformacion(Grupo grupo, ArrayList<Usuario> destinatarios, String asunto, String contenido) {}

    /**
     * Obtiene el grupo al que se enviará la información.
     *
     * @return El grupo al que se enviará la información.
     */
    public Grupo getGrupo() {
        return grupo;
    }

    /**
     * Establece el grupo al que se enviará la información.
     *
     * @param grupo El nuevo grupo al que se enviará la información.
     */
    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    /**
     * Obtiene la lista de destinatarios.
     *
     * @return La lista de destinatarios.
     */
    public ArrayList<Usuario> getDestinatarios() {
        return destinatarios;
    }

    /**
     * Establece la lista de destinatarios.
     *
     * @param destinatarios La nueva lista de destinatarios.
     */
    public void setDestinatarios(ArrayList<Usuario> destinatarios) {
        this.destinatarios = destinatarios;
    }

    /**
     * Obtiene el asunto del mensaje.
     *
     * @return El asunto del mensaje.
     */
    public String getAsunto() {
        return asunto;
    }

    /**
     * Establece el asunto del mensaje.
     *
     * @param asunto El nuevo asunto del mensaje.
     */
    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    /**
     * Obtiene el contenido del mensaje.
     *
     * @return El contenido del mensaje.
     */
    public String getContenido() {
        return contenido;
    }

    /**
     * Establece el contenido del mensaje.
     *
     * @param contenido El nuevo contenido del mensaje.
     */
    public void setContenido(String contenido) {
        this.contenido = contenido;
    }
}