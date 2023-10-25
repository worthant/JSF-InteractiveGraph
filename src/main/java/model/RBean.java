package model;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.validator.ValidatorException;

import java.io.Serializable;
import java.util.Objects;

public class RBean implements Serializable {

    private Double rValue = 0.0;

    public Double getValue(){
        return rValue;
    }

    public void setValue(Double value){
        this.rValue = value;
    }

    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o){
        if (o == null){
            FacesMessage message = new FacesMessage("R value should be in (1, 4) interval");
            throw new ValidatorException(message);
        }
    }

    @Override
    public boolean equals(Object o){
        if (this == o) return true;

        if (!(o instanceof RBean)) return false;

        RBean that = (RBean) o;
        return Double.compare(getValue(), that.getValue()) == 0;
    }

    @Override
    public int hashCode(){
        return Objects.hash(getValue());
    }

    @Override
    public String toString(){
        return "rBean{" +
                "value" + rValue +
                "}";
    }
}
