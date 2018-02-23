package works.hop.webjar.sample.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Item {
    
    private Long id;
    private String name;

    public Item() {
        super();
    }

    public Item(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
