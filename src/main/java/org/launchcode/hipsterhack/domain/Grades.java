package org.launchcode.hipsterhack.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import org.launchcode.hipsterhack.domain.enumeration.GradesEnum;

/**
 * A Grades.
 */
@Entity
@Table(name = "grades")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "grades")
public class Grades implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "grades")
    private GradesEnum grades;

    @ManyToOne
    @JsonIgnoreProperties("grades")
    private Unit unit;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GradesEnum getGrades() {
        return grades;
    }

    public Grades grades(GradesEnum grades) {
        this.grades = grades;
        return this;
    }

    public void setGrades(GradesEnum grades) {
        this.grades = grades;
    }

    public Unit getUnit() {
        return unit;
    }

    public Grades unit(Unit unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Grades)) {
            return false;
        }
        return id != null && id.equals(((Grades) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Grades{" +
            "id=" + getId() +
            ", grades='" + getGrades() + "'" +
            "}";
    }
}
