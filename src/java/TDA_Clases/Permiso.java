/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TDA_Clases;

/**
 *
 * @author lmurr
 */
public class Permiso {
    private int iIdPermiso;
    private String vNombre;

    public Permiso() {
    }

    public Permiso(int iIdPermiso, String vNombre) {
        this.iIdPermiso = iIdPermiso;
        this.vNombre = vNombre;
    }

    public int getiIdPermiso() {
        return iIdPermiso;
    }

    public void setiIdPermiso(int iIdPermiso) {
        this.iIdPermiso = iIdPermiso;
    }

    public String getvNombre() {
        return vNombre;
    }

    public void setvNombre(String vNombre) {
        this.vNombre = vNombre;
    }
    
    
}
