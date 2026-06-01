import java.lang.reflect.*;

class Student {

    public void display() {
        System.out.println("Student");
    }
}

public class ReflectionExample {

    public static void main(String[] args)
            throws Exception {

        Class<?> cls =
                Class.forName("Student");

        Method[] methods =
                cls.getDeclaredMethods();

        for(Method m : methods) {
            System.out.println(
                    m.getName());
        }

        Object obj =
                cls.getDeclaredConstructor()
                        .newInstance();

        Method method =
                cls.getMethod("display");

        method.invoke(obj);
    }
}
