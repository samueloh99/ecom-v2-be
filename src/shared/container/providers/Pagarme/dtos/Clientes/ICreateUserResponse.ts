export default interface ICreateUserResponse {
  id: string;
  name: string;
  email: string;
  code: string;
  document: string;
  document_type: string;
  type: string;
  gender: string;
  delinquent: boolean;
  address: {
    id: string;
    line_1: string;
    line_2: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
    status: string;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
  birthdate: Date;
  phones: {
    home_phone: {
      country_code: string;
      number: string;
      area_code: string;
    };
    mobile_phone: {
      country_code: string;
      number: string;
      area_code: string;
    };
  };
  metadata: {
    id: string;
    company: string;
  };
}
