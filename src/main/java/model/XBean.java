package model;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.validator.ValidatorException;

import java.io.Serializable;
import java.util.Objects;

public class XBean implements Serializable {

    private Double xValue = 0.0;

    public Double getValue(){
        return xValue;
    }

    public void setValue(Double value){
        this.xValue = value;
    }

    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o){
        if (o == null){
            FacesMessage message = new FacesMessage("X value should be in (-5, 5) interval");
            throw new ValidatorException(message);
        }
    }

    @Override
    public boolean equals(Object o){
        if (this == o) return true;

        if (!(o instanceof XBean)) return false;

        XBean that = (XBean) o;
        return Double.compare(getValue(), that.getValue()) == 0;
    }

    @Override
    public int hashCode(){
        return Objects.hash(getValue());
    }

    @Override
    public String toString(){
        return "xBean{" +
                "value" + xValue +
                "}";
    }
}
