package com.ecommerce.service;
import com.ecommerce.entity.Product;
import com.ecommerce.exception.ProductNotFoundException;
import com.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
  
  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  //Add Product

  public Product addProduct(Product product)
  {
    return productRepository.save(product);
  }

  //Get All Products

  public List<Product> getAllProducts()
  {
    return productRepository.findAll();
  }

  //Get Product By Id

  public Product getProductById(Long id)
  {
    return productRepository.findById(id).orElseThrow(()-> new ProductNotFoundException(
        "Product Not Found with id" + id 
    ));
  }

  //Update Product 

  public Product updateProduct(Long id, Product product)
  {
    Product existingProduct = productRepository.findById(id).orElseThrow(()-> new ProductNotFoundException(
        "Product Not Found with id" + id 
    ));
    {
      
      
        existingProduct.setName((product.getName()));
        existingProduct.setDescription((product.getDescription()));
        existingProduct.setPrice((product.getPrice()));
        existingProduct.setQuantity((product.getQuantity()));
        return productRepository.save(existingProduct);
      
    }
  }

  // Delete Product

  public void deleteProduct(Long id)
  {
    Product existingProduct = productRepository.findById(id)
        .orElseThrow(()->new ProductNotFoundException(
        "Product Not Found with id" + id 
    )); 
    productRepository.delete(existingProduct);
  }

}
