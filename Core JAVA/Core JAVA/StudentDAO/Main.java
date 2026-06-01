package StudentDAO;

public class Main {

    public static void main(String[] args) {

        StudentDAO dao =
                new StudentDAO();

        dao.insertStudent(5, "Rahul", 22);
    }
}
