public class DecompileDemo {

    public int subtract(int a, int b) {
        return a - b;
    }

    public static void main(String[] args) {

        DecompileDemo obj = new DecompileDemo();

        int result = obj.subtract(15, 7);

        System.out.println("Subtraction Result = " + result);
    }
}