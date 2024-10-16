/**
 * Esta clase representa a un usuario genérico en el sistema.
 * Almacena la información del usuario y las acciones que puede realizar.
 *
 * @author Janer Vega, Fabiana Acuña
 * @version 1.0
 */
public class Usuario {
    private String nombre;
    private String correo_electronico;
    private String facultad;
    private String carrera;

    /**
     * Constructor por defecto de la clase Usuario
     */
    public Usuario() {}

    /**
     * Constructor de la clase Usuario que inicializa sus atributos.
     *
     * @param nombre El nombre del usuario.
     * @param correo_electronico El correo electrónico del usuario.
     * @param facultad La facultad a la que pertenece el usuario.
     * @param carrera La carrera que estudia el usuario.
     */
    public Usuario(String nombre, String correo_electronico, String facultad, String carrera) {}

    /**
     * Inscribe al usuario a un grupo.
     *
     * @param grupo El grupo al que se desea inscribir.
     */
    public void inscribirse_a_grupo(Grupo grupo) {}

    /**
     * Elimina la inscripción del usuario a un grupo.
     *
     * @param grupo El grupo del que se desea eliminar la inscripción.
     */
    public void elimar_inscripcion_a_grupo(Grupo grupo) {}

    /**
     * Obtiene el nombre del usuario.
     *
     * @return El nombre del usuario.
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Establece el nombre del usuario.
     *
     * @param nombre El nuevo nombre del usuario.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Obtiene el correo electrónico del usuario.
     *
     * @return El correo electrónico del usuario.
     */
    public String getCorreo_electronico() {
        return correo_electronico;
    }

    /**
     * Establece el correo electrónico del usuario.
     *
     * @param correo_electronico El nuevo correo electrónico del usuario.
     */
    public void setCorreo_electronico(String correo_electronico) {
        this.correo_electronico = correo_electronico;
    }

    /**
     * Obtiene la facultad a la que pertenece el usuario.
     *
     * @return La facultad a la que pertenece el usuario.
     */
    public String getFacultad() {
        return facultad;
    }

    /**
     * Establece la facultad a la que pertenece el usuario.
     *
     * @param facultad La nueva facultad a la que pertenece el usuario.
     */
    public void setFacultad(String facultad) {
        this.facultad = facultad;
    }

    /**
     * Obtiene la carrera que estudia el usuario.
     *
     * @return La carrera que estudia el usuario.
     */
    public String getCarrera() {
        return carrera;
    }

    /**
     * Establece la carrera que estudia el usuario.
     *
     * @param carrera La nueva carrera que estudia el usuario.
     */
    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }
}