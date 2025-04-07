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
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashPassword {

    // Método para hashear la contraseña
    public static String hash(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());
            return bytesToHex(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Método para convertir bytes a hexadecimal
    private static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    // Método para verificar si la contraseña ingresada coincide con el hash almacenado
    public static boolean verifyPassword(String userInputPassword, String hashedPassword) {
        String hashedInputPassword = hash(userInputPassword);
        return hashedInputPassword.equals(hashedPassword);
    }
}

