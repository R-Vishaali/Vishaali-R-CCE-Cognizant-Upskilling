import java.sql.*;

public class JDBCExample {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/college";
        String user = "root";
        String password = "Aami@2006";

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con =
                    DriverManager.getConnection(
                            url, user, password);

            Statement stmt =
                    con.createStatement();

            ResultSet rs =
                    stmt.executeQuery(
                            "SELECT * FROM students");

            while(rs.next()) {

                System.out.println(
                        rs.getInt("id") + " " +
                                rs.getString("name") + " " +
                                rs.getInt("age"));
            }

            con.close();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}