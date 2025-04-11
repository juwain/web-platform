export class User {
  constructor(data) {
    const { id, firstName, lastName, email, role } = data;

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdmin() {
    return this.role === 'admin';
  }
}
