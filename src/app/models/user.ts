export class User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;

  constructor(
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}
