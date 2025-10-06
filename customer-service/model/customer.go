package model

type Customer struct {
    Document  string `gorm:"primaryKey;size:50" json:"document"`
    FirstName string `gorm:"size:100" json:"firstname"`
    LastName  string `gorm:"size:100" json:"lastname"`
    Address   string `gorm:"size:255" json:"address"`
    Phone     string `gorm:"size:20" json:"phone"`
    Email     string `gorm:"size:100;unique" json:"email"`
}
