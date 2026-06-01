// File: InspectBytecode.java

public class InspectBytecode {

    // Simple method to demonstrate bytecode
    public int multiply(int a, int b) {
        return a * b;
    }

    public static void main(String[] args) {

        InspectBytecode obj = new InspectBytecode();

        int result = obj.multiply(5, 6);

        System.out.println("Multiplication Result = " + result);
    }
}