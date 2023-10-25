package utils;

public class AreaChecker {
    public static boolean isInArea(double x, double y, double r){
        if (x >= 0 && y >= 0) { // Check for rectangle in the top-right quadrant
            return x < r && y <= r/2;
        }
        if (x >= 0 && y <= 0) { // Check for triangle in bottom-right quadrant
            return (x <= r / 2) && (y >= -r) && (2 * x - y <= r);
        }
        if (x <= 0 && y <= 0) { // Check for the circle in the bottom-left quadrant
            return (x * x + y * y) <= (r * r) / 4;
        }
        return false;
    }
}
