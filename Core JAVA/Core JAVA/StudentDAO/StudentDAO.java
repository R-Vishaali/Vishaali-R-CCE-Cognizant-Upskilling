package StudentDAO;

import java.sql.*;

public class StudentDAO {

    String url = "jdbc:mysql://localhost:3306/college";
    String user = "root";
    String password = "Aami@2006";

    public void insertStudent(
            int id,
            String name,
            int age) {

        String query =
                "INSERT INTO students VALUES(?,?,?)";

        try {

            Connection con =
                    DriverManager.getConnection(
                            url,user,password);

            PreparedStatement pst =
                    con.prepareStatement(query);

            pst.setInt(1,id);
            pst.setString(2,name);
            pst.setInt(3,age);

            pst.executeUpdate();

            con.close();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public void updateStudent(
            int id,
            String newName) {

        String query =
                "UPDATE students SET name=? WHERE id=?";

        try {

            Connection con =
                    DriverManager.getConnection(
                            url,user,password);

            PreparedStatement pst =
                    con.prepareStatement(query);

            pst.setString(1,newName);
            pst.setInt(2,id);

            pst.executeUpdate();

            con.close();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}