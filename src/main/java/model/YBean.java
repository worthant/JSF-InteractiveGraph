package model;

import java.io.Serializable;
import java.util.Objects;

public class YBean implements Serializable {
    private Double yValue;

    public Double getValue(){
        return yValue;
    }

    public void setValue(Double yValue){
        this.yValue = yValue;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        YBean yBean = (YBean) o;
        return Objects.equals(yValue, yBean.yValue);
    }

    @Override
    public int hashCode() {
        return Objects.hash(yValue);
    }

    @Override
    public String toString() {
        return "yBean{" +
                "yValue=" + yValue +
                '}';
    }
}