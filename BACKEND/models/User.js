class User {
  constructor(id, firstName, lastName, email, password, phoneNumber, role, isActive, createdAt, updatedAt) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return this.role;
  }

  getIsActive() {
    return this.isActive;
  }

  update(firstName, lastName, email, phoneNumber, role, isActive) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.isActive = isActive;
  }
}

module.exports = User;