package org.launchcode.hipsterhack.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import org.launchcode.hipsterhack.domain.enumeration.UnitType;

/**
 * A Unit.
 */
@Entity
@Table(name = "unit")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "unit")
public class Unit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "unitenum")
    private UnitType unitenum;

    @Column(name = "name")
    private String name;

    @Column(name = "text")
    private String text;

    @Column(name = "comments")
    private String comments;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UnitType getUnitenum() {
        return unitenum;
    }

    public Unit unitenum(UnitType unitenum) {
        this.unitenum = unitenum;
        return this;
    }

    public void setUnitenum(UnitType unitenum) {
        this.unitenum = unitenum;
    }

    public String getName() {
        return name;
    }

    public Unit name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public Unit text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getComments() {
        return comments;
    }

    public Unit comments(String comments) {
        this.comments = comments;
        return this;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Unit)) {
            return false;
        }
        return id != null && id.equals(((Unit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Unit{" +
            "id=" + getId() +
            ", unitenum='" + getUnitenum() + "'" +
            ", name='" + getName() + "'" +
            ", text='" + getText() + "'" +
            ", comments='" + getComments() + "'" +
            "}";
    }
}
