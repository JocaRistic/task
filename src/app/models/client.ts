export class Client {
  id?: number;
  name: string;
  surname: string;
  email: string;
  phone: string;

  constructor(
    name: string,
    surname: string,
    email: string,
    phone: string,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
  }
}
