package model;

import database.JPAUtils;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.persistence.EntityManager;
import utils.AreaChecker;


import java.io.Serializable;
import java.util.List;
import java.util.Objects;
public class ResultsControllerBean implements Serializable {
    private XBean xBean;
    private YBean yBean;
    private RBean rBean;

    private EntityManager entityManager = JPAUtils.getFactory().createEntityManager();

    private List<PointModel> results;

    @PostConstruct
    public void init(){
        results = entityManager.createQuery("select p from PointModel p", PointModel.class).getResultList();
    }

    public void addResult(final double x, final double y, final double r) {
        PointModel point = new PointModel();
        point.setX(x);
        point.setY(y);
        point.setR(r);
        point.setResult(AreaChecker.isInArea(x, y, r));

        entityManager.getTransaction().begin();
        entityManager.persist(point);
        entityManager.getTransaction().commit();
        results.add(0, point);  // Add to the beginning of the list
    }

    @PreDestroy
    public void onDestroy() {
        if (entityManager.isOpen()) {
            entityManager.close();
        }
    }


//    public void clearResults() {
//        entityManager.createQuery("delete from PointModel").executeUpdate();
//        results.clear();
//    }
//
//    public void updateRValue(double newRValue){
//        for (PointModel point : results){
//            point.setR(newRValue);
//        }
//    }
//
//    public void generateRedrawScript(){
//        for (PointModel point : results){
//            double x = point.getX();
//            double y = point.getY();
//            double r = point.getR();
//            boolean result = AreaChecker.isInArea(x, y, r);
//            FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add("drawPoint(" + x + ", " + y + ", " + r + ", " + result + ");");
//        }
//
//    }

    public XBean getxBean() {
        return xBean;
    }

    public void setxBean(XBean xBean) {
        this.xBean = xBean;
    }

    public YBean getyBean() {
        return yBean;
    }

    public void setyBean(YBean yBean) {
        this.yBean = yBean;
    }

    public RBean getrBean() {
        return rBean;
    }

    public void setrBean(RBean rBean) {
        this.rBean = rBean;
    }

    public List<PointModel> getResults() {
        return results;
    }

    public void setResults(List<PointModel> results) {
        this.results = results;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ResultsControllerBean that = (ResultsControllerBean) o;
        return Objects.equals(xBean, that.xBean) && Objects.equals(yBean, that.yBean) && Objects.equals(rBean, that.rBean) && Objects.equals(results, that.results);
    }

    @Override
    public int hashCode() {
        return Objects.hash(xBean, yBean, rBean, results);
    }

    @Override
    public String toString() {
        return "ResultsControllerBean{" +
                "xBean=" + xBean +
                ", yBean=" + yBean +
                ", rBean=" + rBean +
                ", results=" + results +
                '}';
    }
}