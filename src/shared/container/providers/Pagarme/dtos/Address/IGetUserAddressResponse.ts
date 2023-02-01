export default interface IGetUserAddressResponse {
  data: [
    {
      id: string;
      line_1: string;
      zip_code: string;
      city: string;
      state: string;
      country: string;
      status: string;
      created_at: Date;
      updated_at: Date;
    }[],
  ];
  paging: {
    total: number;
  };
}
