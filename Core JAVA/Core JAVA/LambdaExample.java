import java.util.*;

public class LambdaExample {

    public static void main(String[] args) {

        List<String> names =
                Arrays.asList(
                        "John",
                        "David",
                        "Aami",
                        "Chris");

        names.sort(Comparator.naturalOrder());

        System.out.println(names);
    }
}