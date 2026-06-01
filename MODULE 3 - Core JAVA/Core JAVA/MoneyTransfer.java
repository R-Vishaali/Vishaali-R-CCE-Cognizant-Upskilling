import java.sql.*;

public class MoneyTransfer {

    static String url =
            "jdbc:mysql://localhost:3306/college";

    static String user = "root";
    static String password = "Aami@2006";
    public static void transfer(
            int fromAcc,
            int toAcc,
            double amount) {
        Connection con = null;
        try {

            con = DriverManager.getConnection(
                    url,user,password);

            con.setAutoCommit(false);

            PreparedStatement debit =
                    con.prepareStatement(
                            "UPDATE accounts " +
                                    "SET balance=balance-? " +
                                    "WHERE acc_no=?");

            debit.setDouble(1,amount);
            debit.setInt(2,fromAcc);

            debit.executeUpdate();

            PreparedStatement credit =
                    con.prepareStatement(
                            "UPDATE accounts " +
                                    "SET balance=balance+? " +
                                    "WHERE acc_no=?");

            credit.setDouble(1,amount);
            credit.setInt(2,toAcc);

            credit.executeUpdate();

            con.commit();

            System.out.println("Success");

        } catch(Exception e) {

            try {
                if(con != null)
                    con.rollback();
            }
            catch(Exception ex) {
                ex.printStackTrace();
            }

            e.printStackTrace();
        }
    }

    public static void main(String[] args) {

        transfer(101,102,1000);
    }
}