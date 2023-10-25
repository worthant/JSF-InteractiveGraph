package database;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.Properties;

public class JPAUtils {
    private static final EntityManagerFactory factory;

    static {
        try {
            Properties info = new Properties();
            info.load(JPAUtils.class.getClassLoader().getResourceAsStream("/db.cfg"));
            factory = Persistence.createEntityManagerFactory("pointPU", info);
        } catch (Throwable ex) {
            System.err.println("Something went wrong during initializing Hibernate: " + ex);
            throw new ExceptionInInitializerError();
        }
    }

    public static EntityManagerFactory getFactory() {
        return factory;
    }
}
