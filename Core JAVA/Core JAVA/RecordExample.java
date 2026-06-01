import java.util.*;
import java.util.stream.Collectors;

record Person(String name, int age) {}

public class RecordExample {

    public static void main(String[] args) {

        List<Person> people =
                List.of(
                        new Person("Aami",21),
                        new Person("John",17),
                        new Person("David",25)
                );

        List<Person> adults =
                people.stream()
                        .filter(p -> p.age() >= 18)
                        .collect(Collectors.toList());

        adults.forEach(System.out::println);
    }
}