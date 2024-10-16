import java.util.ArrayList;

/**
 * Esta clase representa a un grupo genérico en el sistema.
 * Almacena la información del grupo y las acciones que puede realizar.
 *
 * @author Janer Vega, Fabiana Acuña
 * @version 1.0
 */

public class Grupo {
    private String nombre;
    private String descripcion;
    private String horario;
    private String ubicacion;
    private int cupos;
    private String facultad;
    private String escuela;
    private ArrayList<Usuario> inscritos;

    /**
     * Constructor por defecto de la clase Grupo.
     */
    public Grupo() {}

    /**
     * Constructor de la clase Grupo que inicializa sus atributos.
     *
     * @param nombre El nombre del grupo.
     * @param descripcion La descripción del grupo.
     * @param horario El horario del grupo.
     * @param ubicacion La ubicación del grupo.
     * @param cupos El número de cupos disponibles.
     * @param facultad La facultad a la que pertenece el grupo.
     * @param escuela La escuela a la que pertenece el grupo.
     */
    public Grupo(String nombre, String descripcion, String horario, String ubicacion, int cupos, String facultad, String escuela) {}

    /**
     * Almacena la lista de usuarios inscritos en el grupo.
     *
     * @param inscritos La lista de usuarios inscritos.
     */
    public void almacenar_inscritos(ArrayList<Usuario> inscritos) {}

    /**
     * Almacena el número de cupos disponibles en el grupo.
     */
    public void almacenar_cupos() {}

    /**
     * Obtiene el nombre del grupo.
     *
     * @return El nombre del grupo.
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Establece el nombre del grupo.
     *
     * @param nombre El nuevo nombre del grupo.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Obtiene la descripción del grupo.
     *
     * @return La descripción del grupo.
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Establece la descripción del grupo.
     *
     * @param descripcion La nueva descripción del grupo.
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * Obtiene el horario del grupo.
     *
     * @return El horario del grupo.
     */
    public String getHorario() {
        return horario;
    }

    /**
     * Establece el horario del grupo.
     *
     * @param horario El nuevo horario del grupo.
     */
    public void setHorario(String horario) {
        this.horario = horario;
    }

    /**
     * Obtiene la ubicación del grupo.
     *
     * @return La ubicación del grupo.
     */
    public String getUbicacion() {
        return ubicacion;
    }

    /**
     * Establece la ubicación del grupo.
     *
     * @param ubicacion La nueva ubicación del grupo.
     */
    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    /**
     * Obtiene el número de cupos disponibles en el grupo.
     *
     * @return El número de cupos disponibles.
     */
    public int getCupos() {
        return cupos;
    }

    /**
     * Establece el número de cupos disponibles en el grupo.
     *
     * @param cupos El nuevo número de cupos disponibles.
     */
    public void setCupos(int cupos) {
        this.cupos = cupos;
    }

    /**
     * Obtiene la facultad a la que pertenece el grupo.
     *
     * @return La facultad a la que pertenece el grupo.
     */
    public String getFacultad() {
        return facultad;
    }

    /**
     * Establece la facultad a la que pertenece el grupo.
     *
     * @param facultad La nueva facultad a la que pertenece el grupo.
     */
    public void setFacultad(String facultad) {
        this.facultad = facultad;
    }

    /**
     * Obtiene la escuela a la que pertenece el grupo.
     *
     * @return La escuela a la que pertenece el grupo.
     */
    public String getEscuela() {
        return escuela;
    }

    /**
     * Establece la escuela a la que pertenece el grupo.
     *
     * @param escuela La nueva escuela a la que pertenece el grupo.
     */
    public void setEscuela(String escuela) {
        this.escuela = escuela;
    }

    /**
     * Obtiene la lista de usuarios inscritos en el grupo.
     *
     * @return La lista de usuarios inscritos.
     */
    public ArrayList<Usuario> getInscritos() {
        return inscritos;
    }

    /**
     * Establece la lista de usuarios inscritos en el grupo.
     *
     * @param inscritos La nueva lista de usuarios inscritos.
     */
    public void setInscritos(ArrayList<Usuario> inscritos) {
        this.inscritos = inscritos;
    }
}