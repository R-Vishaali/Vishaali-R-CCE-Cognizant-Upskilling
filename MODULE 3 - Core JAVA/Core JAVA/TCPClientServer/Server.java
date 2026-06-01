package TCPClientServer;
import java.io.*;
import java.net.*;

public class Server {

    public static void main(String[] args)
            throws Exception {

        ServerSocket server =
                new ServerSocket(5000);

        System.out.println("Waiting...");

        Socket socket =
                server.accept();

        DataInputStream dis =
                new DataInputStream(
                        socket.getInputStream());

        DataOutputStream dos =
                new DataOutputStream(
                        socket.getOutputStream());

        System.out.println(
                "Client: " +
                        dis.readUTF());

        dos.writeUTF(
                "Hello Client");

        socket.close();
        server.close();
    }
}