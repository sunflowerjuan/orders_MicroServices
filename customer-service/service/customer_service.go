package service

import (
    "customer-service/model"
    "customer-service/repository"
)

type CustomerService struct {
    Repo *repository.CustomerRepository
}

func NewCustomerService(repo *repository.CustomerRepository) *CustomerService {
    return &CustomerService{Repo: repo}
}

func (s *CustomerService) CreateCustomer(c model.Customer) error {
    return s.Repo.Create(c)
}

func (s *CustomerService) UpdateCustomer(c model.Customer) error {
    return s.Repo.Update(c)
}

func (s *CustomerService) FindCustomerByID(document string) (model.Customer, error) {
    return s.Repo.FindByID(document)
}
