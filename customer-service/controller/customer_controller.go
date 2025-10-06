package controller

import (
    "customer-service/model"
    "customer-service/service"
    "github.com/gin-gonic/gin"
    "net/http"
)

type CustomerController struct {
    Service *service.CustomerService
}

func NewCustomerController(s *service.CustomerService) *CustomerController {
    return &CustomerController{Service: s}
}

func (cc *CustomerController) RegisterRoutes(r *gin.Engine) {
    r.GET("/hello", cc.Hello)
    r.POST("/createcustomer", cc.CreateCustomer)
    r.PUT("/updatecustomer", cc.UpdateCustomer)
    r.GET("/findcustomerbyid/:document", cc.FindCustomerByID)
}

func (cc *CustomerController) CreateCustomer(c *gin.Context) {
    var customer model.Customer
    if err := c.ShouldBindJSON(&customer); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    if err := cc.Service.CreateCustomer(customer); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusCreated, customer)
}

func (cc *CustomerController) UpdateCustomer(c *gin.Context) {
    var customer model.Customer
    if err := c.ShouldBindJSON(&customer); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    if err := cc.Service.UpdateCustomer(customer); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, customer)
}

func (cc *CustomerController) FindCustomerByID(c *gin.Context) {
    document := c.Param("document")
    customer, err := cc.Service.FindCustomerByID(document)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
        return
    }
    c.JSON(http.StatusOK, customer)
}

func (cc *CustomerController) Hello(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
        "message": "Customer service is running!",
    })
}
