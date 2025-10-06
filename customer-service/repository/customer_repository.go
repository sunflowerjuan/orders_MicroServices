package repository

import (
    "customer-service/model"
    "gorm.io/gorm"
)

type CustomerRepository struct {
    DB *gorm.DB
}

func NewCustomerRepository(db *gorm.DB) *CustomerRepository {
    return &CustomerRepository{DB: db}
}

func (r *CustomerRepository) Create(customer model.Customer) error {
    return r.DB.Create(&customer).Error
}

func (r *CustomerRepository) Update(customer model.Customer) error {
    return r.DB.Save(&customer).Error
}

func (r *CustomerRepository) FindByID(document string) (model.Customer, error) {
    var customer model.Customer
    err := r.DB.First(&customer, "document = ?", document).Error
    return customer, err
}
