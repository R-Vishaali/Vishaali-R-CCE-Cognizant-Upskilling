package TCPClientServer;
import java.io.*;
import java.net.*;

public class Client {

    public static void main(String[] args)
            throws Exception {

        Socket socket =
                new Socket(
                        "localhost",
                        5000);

        DataInputStream dis =
                new DataInputStream(
                        socket.getInputStream());

        DataOutputStream dos =
                new DataOutputStream(
                        socket.getOutputStream());

        dos.writeUTF("Hello Server");

        System.out.println(
                dis.readUTF());

        socket.close();
    }
}