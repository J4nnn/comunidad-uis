/**
 * Esta clase representa a un administrador de grupo que hereda de la clase Usuario.
 * Tiene la capacidad de crear, eliminar, editar grupos y enviar correos a los miembros.
 *
 * @author Janer Vega, Fabiana Acuña
 * @version 1.0
 */
public class AdministradorGrupo extends Usuario {

    /**
     * Crea un nuevo grupo.
     */
    public void crearGrupo() {}

    /**
     * Elimina un grupo existente.
     *
     * @param grupo El grupo a eliminar.
     */
    public void eliminarGrupo(Grupo grupo) {}

    /**
     * Edita la información de un grupo existente.
     *
     * @param grupo El grupo a editar.
     */
    public void editarGrupo(Grupo grupo) {}

    /**
     * Envía un correo a los miembros de un grupo.
     *
     * @param mensaje El objeto EnviarInformacion que contiene la información del mensaje a enviar.
     */
    public void enviarCorreo(EnviarInformacion mensaje) {}
}