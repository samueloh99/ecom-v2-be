export default interface ICreateUserAddressResponse {
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
  customer: {
    id: string;
    name: string;
    email: string;
    document: string;
    type: string;
    delinquent: boolean;
    created_at: Date;
    updated_at: Date;
    metadata: {
      id: string;
    };
  };
  metadata: {
    id: string;
  };
}
