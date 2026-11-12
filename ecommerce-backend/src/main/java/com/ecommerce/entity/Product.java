package com.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;

    private String name;

    private String description;

    private double price;

    private int quantity;

    private String imageUrl;

    private String category;

    private String ram;

    private String storage;

    private String color;


    public Product() {

    }


    public Long getId() {

        return id;

    }

    public void setId(Long id) {

        this.id = id;

    }


    public String getBrand() {

        return brand;

    }

    public void setBrand(String brand) {

        this.brand = brand;

    }


    public String getName() {

        return name;

    }

    public void setName(String name) {

        this.name = name;

    }


    public String getDescription() {

        return description;

    }

    public void setDescription(String description) {

        this.description = description;

    }


    public double getPrice() {

        return price;

    }

    public void setPrice(double price) {

        this.price = price;

    }


    public int getQuantity() {

        return quantity;

    }

    public void setQuantity(int quantity) {

        this.quantity = quantity;

    }


    public String getImageUrl() {

        return imageUrl;

    }

    public void setImageUrl(String imageUrl) {

        this.imageUrl = imageUrl;

    }


    public String getCategory() {

        return category;

    }

    public void setCategory(String category) {

        this.category = category;

    }


    public String getRam() {

        return ram;

    }

    public void setRam(String ram) {

        this.ram = ram;

    }


    public String getStorage() {

        return storage;

    }

    public void setStorage(String storage) {

        this.storage = storage;

    }


    public String getColor() {

        return color;

    }

    public void setColor(String color) {

        this.color = color;

    }

}