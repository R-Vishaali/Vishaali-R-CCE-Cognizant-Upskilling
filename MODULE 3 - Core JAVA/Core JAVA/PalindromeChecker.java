import java.util.Scanner;

public class PalindromeChecker {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter string: ");
        String str = sc.nextLine();

        str = str.replaceAll("[^a-zA-Z0-9]", "")
                .toLowerCase();

        String reversed =
                new StringBuilder(str).reverse().toString();

        if(str.equals(reversed))
            System.out.println("Palindrome");
        else
            System.out.println("Not Palindrome");
    }
}